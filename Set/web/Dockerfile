FROM php:8.3-fpm-alpine

#ARG http_proxy=http://172.27.100.5:4444
#ARG https_proxy=http://172.27.100.5:4444

RUN apk add libpq postgresql-dev \
    && docker-php-ext-install mysqli pgsql

COPY index.php /var/www/html/index.php
