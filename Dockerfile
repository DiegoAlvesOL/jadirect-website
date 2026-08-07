# Purpose    : Container image definition. Serves the static site via Nginx.
# Consumed by: Docker build (local dev via docker-compose, and Railway in production)
# Layer      : Infrastructure

FROM nginx:alpine

COPY public/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
