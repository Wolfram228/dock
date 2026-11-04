FROM php:8.3-fpm-alpine
RUN apk add libpq \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS postgresql-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps
WORKDIR /var/www/html
COPY index.php .
