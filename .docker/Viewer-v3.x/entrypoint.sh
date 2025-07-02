#!/bin/sh

if [ -n "$SSL_PORT" ]; then
  envsubst '${SSL_PORT}:${PORT}' < /usr/src/default.ssl.conf.template | envsubst '${PUBLIC_URL}' > /etc/nginx/conf.d/default.conf
else
  envsubst '${PORT}:${PUBLIC_URL}' < /usr/src/default.conf.template > /etc/nginx/conf.d/default.conf
fi

# Write app-config.js from the APP_CONFIG file if set
if [ -n "$APP_CONFIG" ]; then
  CONFIG_FILE="/usr/share/nginx/html${PUBLIC_URL}${APP_CONFIG}"
  OUTPUT_FILE="/usr/share/nginx/html${PUBLIC_URL}app-config.js"

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
if [ -f /usr/share/nginx/html${PUBLIC_URL}app-config.js ]; then
  if [ -s /usr/share/nginx/html${PUBLIC_URL}app-config.js ]; then
    echo "Detected non-empty app-config.js. Ensuring .gz file is updated..."
    rm -f /usr/share/nginx/html${PUBLIC_URL}app-config.js.gz
    gzip /usr/share/nginx/html${PUBLIC_URL}app-config.js
    touch /usr/share/nginx/html${PUBLIC_URL}app-config.js
    echo "Compressed app-config.js to app-config.js.gz"
  else
    echo "app-config.js is empty. Skipping compression."
  fi
else
  echo "No app-config.js file found. Skipping compression."
fi

# Google Cloud Healthcare-specific config
if [ -n "$CLIENT_ID" ] || [ -n "$HEALTHCARE_API_ENDPOINT" ]; then
  if [ -n "$CLIENT_ID" ]; then
    echo "Google Cloud Healthcare \$CLIENT_ID has been provided: "
    echo "$CLIENT_ID"
    echo "Updating config..."
    sed -i -e "s/YOURCLIENTID.apps.googleusercontent.com/$CLIENT_ID/g" /usr/share/nginx/html/google.js
  fi

  if [ -n "$HEALTHCARE_API_ENDPOINT" ]; then
    echo "Google Cloud Healthcare \$HEALTHCARE_API_ENDPOINT has been provided: "
    echo "$HEALTHCARE_API_ENDPOINT"
    echo "Updating config..."
    sed -i -e "s+https://healthcare.googleapis.com/v1+$HEALTHCARE_API_ENDPOINT+g" /usr/share/nginx/html/google.js
  fi

  cp /usr/share/nginx/html/google.js /usr/share/nginx/html/app-config.js
fi

echo "Starting Nginx to serve the OHIF Viewer on ${PUBLIC_URL}"

exec "$@"
