# -------------------------------
# Stage 1: Build OHIF with Bun
# -------------------------------
  FROM node:20-slim AS builder

  RUN apt-get update && apt-get install -y build-essential python3

  # Set working directory
  WORKDIR /usr/src/app

  # Install Bun globally
  RUN npm install -g bun
  ENV PATH=/usr/src/app/node_modules/.bin:$PATH

  # Copy package manifests first for dependency install
  COPY package.json yarn.lock preinstall.js lerna.json ./

  # Copy all package.json files for sub-packages
  COPY addOns/*/*/package.json ./addOns/
  COPY extensions/*/package.json ./extensions/
  COPY modes/*/package.json ./modes/
  COPY platform/*/package.json ./platform/

  # Clean Bun cache and install dependencies
  RUN bun pm cache rm
  RUN bun install

  # Copy the rest of the project
  COPY . .

  # Build arguments
  ENV QUICK_BUILD true
  ARG APP_CONFIG=config/default.js
  ARG PUBLIC_URL=/ohif/
  ENV APP_CONFIG=${APP_CONFIG}
  ENV PUBLIC_URL=${PUBLIC_URL}

  # Show config and build OHIF
  RUN bun run show:config
  RUN bun run build

  # Precompress files
  RUN chmod u+x .docker/compressDist.sh
  RUN ./.docker/compressDist.sh


  # -------------------------------
  # Stage 2: Nginx final image
  # -------------------------------
  FROM nginx:alpine AS final

  # Environment variables
  ARG PUBLIC_URL=/ohif
  ENV PUBLIC_URL=${PUBLIC_URL}
  ARG PORT=80
  ENV PORT=${PORT}

  # Remove default config
  RUN rm /etc/nginx/conf.d/default.conf

  # Copy OHIF entrypoint and scripts
  COPY --chown=nginx:nginx .docker/Viewer-v3.x /usr/src
  RUN chmod +x /usr/src/entrypoint.sh

  # Copy build output
  COPY --from=builder /usr/src/app/platform/app/public/config/default.js /usr/share/nginx/html/ohif/config/default.js
  COPY --from=builder /usr/src/app/platform/app/dist /usr/share/nginx/html${PUBLIC_URL}

  # Copy microscopy viewer
  COPY --from=builder /usr/src/app/platform/app/dist/dicom-microscopy-viewer /usr/share/nginx/html/dicom-microscopy-viewer

  # Permissions
  RUN chown -R nginx:nginx /usr/share/nginx/html

  # Use unprivileged user
  USER nginx

  # Entrypoint and default command
  ENTRYPOINT ["/usr/src/entrypoint.sh"]
  CMD ["nginx", "-g", "daemon off;"]
