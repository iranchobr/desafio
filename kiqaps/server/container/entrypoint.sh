#!/bin/bash

echo 'w8 for mysql be ready for connection'
while ! mysqladmin ping -h mysql --silent; do
  sleep 1
done
echo 'mysql ready, running the server'
cd /app/src
npm run migrate
npm start