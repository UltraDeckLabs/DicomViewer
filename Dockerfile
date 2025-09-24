# This dockerfile is used to publish the `ohif/app` image on dockerhub.
#
# It's a good example of how to build our static application and package it
# with a web server capable of hosting it as static content.
#
# docker build
# --------------
# If you would like to use this dockerfile to build and tag an image, make sure
# you set the context to the project's root directory:
# https://docs.docker.com/engine/reference/commandline/build/
#
#
# SUMMARY
# --------------
# This dockerfile has two stages:
#
# 1. Building the React application for production
# 2. Setting up our Nginx (Alpine Linux) image w/ step one's output
#


# syntax=docker/dockerfile:1.7-labs
# This dockerfile is used to publish the `ohif/app` image on dockerhub.
#
# It's a good example of how to build our static application and package it
# with a web server capable of hosting it as static content.
#
# docker build
# --------------
# If you would like to use this dockerfile to build and tag an image, make sure
# you set the context to the project's root directory:
# https://docs.docker.com/engine/reference/commandline/build/
#
#
# SUMMARY
# --------------
# This dockerfile is used as an input for a second stage to make things run faster.
#


# Stage 1: Build the application
# docker build -t ohif/viewer:latest .
# Copy Files

# syntax=docker/dockerfile:1

# Stage 1: Build OHIF

FROM node:20.18.1-slim AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Install bun
RUN npm install -g bun
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# Copy only essential package files first
COPY package.json yarn.lock preinstall.js lerna.json ./

# Copy sub-package package.json files
COPY addOns/package.json addOns/*/*/package.json ./addOns/
COPY extensions/*/package.json ./extensions/
COPY modes/*/package.json ./modes/
COPY platform/*/package.json ./platform/

# Clean bun cache and install dependencies
RUN bun pm cache rm
RUN bun install

# Copy all remaining source files (rely on .dockerignore for exclusions)
COPY . .

# Build environment variables
ENV QUICK_BUILD=true
ARG APP_CONFIG=config/default.js
ARG PUBLIC_URL=/ohif/
ENV PUBLIC_URL=${PUBLIC_URL}

# Show config and build
RUN bun run show:config
RUN bun run build

# Precompress assets
RUN chmod +x ./.docker/compressDist.sh
RUN ./.docker/compressDist.sh

# Stage 2: Nginx serving
FROM nginx:1.27-alpine

ARG PUBLIC_URL=/ohif/
ENV PUBLIC_URL=${PUBLIC_URL}
ARG PORT=80
ENV PORT=${PORT}

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

USER nginx

# Copy OHIF viewer build
COPY --chown=nginx:nginx .docker/Viewer-v3.x /usr/src
COPY --from=builder /usr/src/app/platform/app/public/config/default.js /usr/share/nginx/html/config/default.js
COPY --from=builder /usr/src/app/platform/app/dist /usr/share/nginx/html${PUBLIC_URL}
COPY --from=builder /usr/src/app/platform/app/dist/dicom-microscopy-viewer /usr/share/nginx/html/dicom-microscopy-viewer

# Set permissions for entrypoint script
RUN chmod 777 /usr/src/entrypoint.sh

# Ensure nginx user owns all files
USER root
RUN chown -R nginx:nginx /usr/share/nginx/html
USER nginx

# Entrypoint and command
ENTRYPOINT ["/usr/src/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
