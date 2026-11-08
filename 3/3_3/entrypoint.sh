#!/bin/sh
set -e

if [ ! -d /app/game ]; then
    git clone https://github.com/MohitMurotiya/2048.git /app/game
fi

cd /app/game
npm install
exec npm start
