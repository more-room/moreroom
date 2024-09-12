FROM nginx:alpine
LABEL authors="LEE JIHYE"

COPY ./frontend/build /usr/share/nginx/html
# COPY ./image /usr/share/nginx/html/images
COPY nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst '$$DOCKER_TAG_BE $$BACKEND_PORT $$SERVER_NAME $$CONTEXT_PATH' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]