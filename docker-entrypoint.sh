#!/bin/sh
# This file is executed at the beginning of the docker container session
# It replaces the environment variables

set -e

sed -i  "s#<%= ENV\[\"PORT\"\] %>#$PORT#g" /etc/nginx/nginx.conf
sed -i  "s#<%= ENV\[\"APP_ROOT\"\] %>#$APP_ROOT#g" /etc/nginx/nginx.conf
sed -i  "s#<%= ENV\[\"BACKEND_URL\"\] %>#$BACKEND_URL#g" /etc/nginx/nginx.conf
sed -i  "s#<%= ENV\[\"TODO_URL\"\] %>#$TODO_URL#g" /etc/nginx/nginx.conf
cat /etc/nginx/nginx.conf

exec "$@"