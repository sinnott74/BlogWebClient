FROM nginx:1.15.1-alpine

# Set Environment variables to be used in nginx.conf
ENV PORT=80
ENV APP_ROOT=/
ENV BACKEND_ADDR=http://host.docker.internal:8080

COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 777 /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
COPY build /public/build
CMD ["nginx"]