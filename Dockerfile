# Purpose    : Container image definition. Serves the static site via Nginx.
# Consumed by: Docker build (local dev via docker-compose, and Railway in production)
# Layer      : Infrastructure

FROM nginx:alpine

COPY public/index.html /usr/share/nginx/html/index.html
COPY public/pages/about.html public/pages/fleet.html public/pages/legal.html public/pages/thank-you.html /usr/share/nginx/html/pages/
COPY public/assets/ /usr/share/nginx/html/assets/
COPY public/data/ /usr/share/nginx/html/data/

COPY public/pages/contact.html.template /etc/nginx/templates/pages/contact.html.template
ENV NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80