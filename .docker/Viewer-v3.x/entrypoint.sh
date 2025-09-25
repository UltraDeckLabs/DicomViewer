#!/bin/sh

if [ -n "$SSL_PORT" ]; then
  envsubst '${SSL_PORT}:${PORT}' < /usr/src/default.ssl.conf.template | envsubst '${PUBLIC_URL}' > /etc/nginx/conf.d/default.conf
else
  envsubst '${PORT}:${PUBLIC_URL}' < /usr/src/default.conf.template > /etc/nginx/conf.d/default.conf
fi

# Normalize PUBLIC_URL (ensure leading slash, remove trailing slash)
PUBLIC_URL=${PUBLIC_URL%/}
[ "${PUBLIC_URL:0:1}" != "/" ] && PUBLIC_URL="/$PUBLIC_URL"

# Write app-config.js
if [ -n "$APP_CONFIG" ]; then
  CONFIG_FILE="/usr/src/config/${APP_CONFIG}"
  OUTPUT_FILE="/usr/share/nginx/html${PUBLIC_URL}/app-config.js"

  if [ -f "$CONFIG_FILE" ]; then
    echo "Using APP_CONFIG from $CONFIG_FILE"
    echo "window.config = " > "$OUTPUT_FILE"
    cat "$CONFIG_FILE" >> "$OUTPUT_FILE"
    echo ";" >> "$OUTPUT_FILE"
  else
    echo "APP_CONFIG file not found at $CONFIG_FILE"
  fi
else
  echo "APP_CONFIG is not set"
fi

# Gzip app-config.js if non-empty
if [ -f /usr/share/nginx/html${PUBLIC_URL}/app-config.js ]; then
  if [ -s /usr/share/nginx/html${PUBLIC_URL}/app-config.js ]; then
    echo "Detected non-empty app-config.js. Ensuring .gz file is updated..."
    rm -f /usr/share/nginx/html${PUBLIC_URL}/app-config.js.gz
    gzip /usr/share/nginx/html${PUBLIC_URL}/app-config.js
    touch /usr/share/nginx/html${PUBLIC_URL}/app-config.js
    echo "Compressed app-config.js to app-config.js.gz"
  else
    echo "app-config.js is empty. Skipping compression."
  fi
else
  echo "No app-config.js file found. Skipping compression."
fi

echo "Starting Nginx to serve the OHIF Viewer on ${PUBLIC_URL}"
exec "$@"
