##############################
# Stage 1: Build OHIF with Bun
##############################
FROM node:20.18.1-slim as builder

# Install build tools
RUN apt-get update && apt-get install -y build-essential python3

# Setup working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Install Bun
RUN npm install -g bun
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# Copy package manifests
COPY package.json yarn.lock preinstall.js lerna.json ./
COPY --parents \
    ./addOns/package.json \
    ./addOns/*/*/package.json \
    ./extensions/*/package.json \
    ./modes/*/package.json \
    ./platform/*/package.json ./

# Clear cache and install dependencies
RUN bun pm cache rm
RUN bun install

# Copy project files (excluding Dockerfile, package.json, yarn.lock)
COPY --link --exclude=yarn.lock --exclude=package.json --exclude=Dockerfile . .

# Build environment variables
ENV QUICK_BUILD true
ARG APP_CONFIG=config/default.js
ARG PUBLIC_URL=/ohif/
ENV APP_CONFIG=${APP_CONFIG}
ENV PUBLIC_URL=${PUBLIC_URL}

# Show configuration and build
RUN bun run show:config
RUN bun run build

# Precompress build output
RUN chmod u+x .docker/compressDist.sh
RUN ./.docker/compressDist.sh

#################################
# Stage 2: Serve OHIF with Nginx
#################################
FROM nginxinc/nginx-unprivileged:1.27-alpine as final

ARG PUBLIC_URL=/ohif
ENV PUBLIC_URL=${PUBLIC_URL}
ARG PORT=80
ENV PORT=${PORT}

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy helper scripts
USER nginx
COPY --chown=nginx:nginx .docker/Viewer-v3.x /usr/src
RUN chmod 777 /usr/src/entrypoint.sh

# Copy OHIF build output
COPY --from=builder /usr/src/app/platform/app/public/config/default.js /usr/share/nginx/html/ohif/config/default.js
COPY --from=builder /usr/src/app/platform/app/dist /usr/share/nginx/html${PUBLIC_URL}

# Copy microscopy viewer at root-level
COPY --from=builder /usr/src/app/platform/app/dist/dicom-microscopy-viewer /usr/share/nginx/html/dicom-microscopy-viewer

# Fix permissions
USER root
RUN chown -R nginx:nginx /usr/share/nginx/html
USER nginx

# Entrypoint & Nginx
ENTRYPOINT ["/usr/src/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
