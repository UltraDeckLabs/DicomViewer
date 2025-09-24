##############################
# Stage 1: Build OHIF with Bun
##############################
FROM node:20.18.1-slim as builder

RUN apt-get update && apt-get install -y build-essential python3

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g bun
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# Copy package manifests
COPY package.json yarn.lock preinstall.js lerna.json ./

# Copy subproject package.json files individually
COPY addOns/package.json addOns/package.json
COPY addOns/*/*/package.json addOns/
COPY extensions/*/package.json extensions/
COPY modes/*/package.json modes/
COPY platform/*/package.json platform/

# Clear cache and install dependencies
RUN bun pm cache rm
RUN bun install

# Copy the rest of the project
COPY --link --exclude=yarn.lock --exclude=package.json --exclude=Dockerfile . .

# Build
ENV QUICK_BUILD true
ARG APP_CONFIG=config/default.js
ARG PUBLIC_URL=/ohif/
ENV APP_CONFIG=${APP_CONFIG}
ENV PUBLIC_URL=${PUBLIC_URL}

RUN bun run show:config
RUN bun run build

# Precompress files
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

RUN rm /etc/nginx/conf.d/default.conf

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

ENTRYPOINT ["/usr/src/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
