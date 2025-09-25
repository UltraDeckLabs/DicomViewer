# -------------------------------
# Stage 1: Build OHIF
# -------------------------------
  FROM node:20.18.1-slim as builder

  RUN apt-get update && apt-get install -y build-essential python3

  WORKDIR /usr/src/app

  # Tools
  RUN npm install -g bun lerna@7.4.2
  ENV PATH=/usr/src/app/node_modules/.bin:$PATH

  # Copy base files
  COPY package.json yarn.lock preinstall.js lerna.json ./

  # Copy workspaces
  COPY addOns ./addOns
  COPY extensions ./extensions
  COPY modes ./modes
  COPY platform ./platform

  # Clear bun cache and install deps
  RUN bun pm cache rm
  RUN bun install

  # Copy rest of project
  COPY . .

  # Build OHIF
  ENV QUICK_BUILD=true

  # IMPORTANT: make PUBLIC_URL available at build time
  ARG PUBLIC_URL=/ohif
  ENV PUBLIC_URL=$PUBLIC_URL

  ARG APP_CONFIG=default.js
  ENV APP_CONFIG=$APP_CONFIG

  RUN bun run show:config
  RUN bun run build

  # Precompress (optional)
  RUN chmod u+x .docker/compressDist.sh && ./.docker/compressDist.sh

  # Store config separately for entrypoint
  RUN mkdir -p /usr/src/config
  COPY platform/app/public/config/default.js /usr/src/config/default.js


  # -------------------------------
  # Stage 2: Nginx runtime
  # -------------------------------
  FROM nginxinc/nginx-unprivileged:1.27-alpine as final

  ARG PUBLIC_URL=/ohif
  ENV PUBLIC_URL=$PUBLIC_URL
  ARG PORT=80
  ENV PORT=${PORT}

  # Remove default Nginx conf
  RUN rm /etc/nginx/conf.d/default.conf

  # Copy custom entrypoint & templates
  COPY --chown=nginx:nginx .docker/Viewer-v3.x /usr/src
  RUN chmod +x /usr/src/entrypoint.sh

  # Copy built app into subpath (PUBLIC_URL=/ohif)
  COPY --from=builder /usr/src/app/platform/app/dist /usr/share/nginx/html${PUBLIC_URL}
  COPY --from=builder /usr/src/app/platform/app/dist/dicom-microscopy-viewer /usr/share/nginx/html/dicom-microscopy-viewer

  # Copy config for entrypoint
  COPY --from=builder /usr/src/config/default.js /usr/src/config/default.js

  # Fix permissions
  USER root
  RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R u+rwX /usr/share/nginx/html
  USER nginx

  ENTRYPOINT ["/usr/src/entrypoint.sh"]
  CMD ["nginx", "-g", "daemon off;"]
