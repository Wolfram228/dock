#!/bin/sh
set -e
if [ ! -d /app/durak-webapp ]; then
    git clone https://github.com/KeKsBoTer/durak-webapp /app/durak-webapp
fi
cd /app/durak-webapp
npm install
exec npm start