# syntax=docker/dockerfile:1

FROM node:20.18.1-slim as builder

RUN apt-get update && apt-get install -y build-essential python3

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g bun
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# Initial install
COPY package.json yarn.lock preinstall.js lerna.json ./
COPY --parents ./addOns/package.json ./addOns/*/*/package.json \
              ./extensions/*/package.json ./modes/*/package.json \
              ./platform/*/package.json ./

RUN bun pm cache rm
RUN bun install

# Copy local directory
COPY --link --exclude=yarn.lock --exclude=package.json --exclude=Dockerfile . .

# Build
ENV QUICK_BUILD true
ARG APP_CONFIG=config/default.js
ARG PUBLIC_URL=/ohif
ENV APP_CONFIG=${APP_CONFIG}
ENV PUBLIC_URL=${PUBLIC_URL}

RUN bun run show:config
RUN bun run build

# Precompress files
RUN chmod u+x .docker/compressDist.sh
RUN ./.docker/compressDist.sh


# -------------------------------
# Stage 2: Nginx final image
# -------------------------------
FROM nginxinc/nginx-unprivileged:1.27-alpine as final

ARG PUBLIC_URL=/ohif
ENV PUBLIC_URL=${PUBLIC_URL}
ARG PORT=80
ENV PORT=${PORT}

RUN rm /etc/nginx/conf.d/default.conf

USER nginx
COPY --chown=nginx:nginx .docker/Viewer-v3.x /usr/src
RUN chmod 755 /usr/src/entrypoint.sh

# Copy build output
COPY --from=builder /usr/src/app/platform/app/public/config/default.js \
     /usr/share/nginx/html${PUBLIC_URL}/config/default.js
COPY --from=builder /usr/src/app/platform/app/dist \
     /usr/share/nginx/html${PUBLIC_URL}

# Copy microscopy viewer as root-level
COPY --from=builder /usr/src/app/platform/app/dist/dicom-microscopy-viewer \
     /usr/share/nginx/html/dicom-microscopy-viewer

# Permissions
USER root
RUN chown -R nginx:nginx /usr/share/nginx/html
USER nginx

ENTRYPOINT ["/usr/src/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
