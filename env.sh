#!/bin/bash

# Recreate config file
rm -rf /usr/share/nginx/html/assets/env/env-config.js
touch /usr/share/nginx/html/assets/env/env-config.js

# Add assignment 
echo "window._env_ = {" >> /usr/share/nginx/html/assets/env/env-config.js

# Read environment variables and set them in env-config.js
# Add your environment variables here
for key in $(env | grep '^APP_' | cut -d= -f1); do
    value=$(printenv $key)
    echo "  $key: \"$value\"," >> /usr/share/nginx/html/assets/env/env-config.js
done

echo "}" >> /usr/share/nginx/html/assets/env/env-config.js
