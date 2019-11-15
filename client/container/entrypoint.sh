#!/bin/bash

echo 'w8 for server'

STATUS=$(curl -s -o /dev/null -I -w '%{http_code}' http://server:8080/)
while [ $STATUS -eq 000 ]; do
  sleep 1
  let STATUS=$(curl -s -o /dev/null -I -w '%{http_code}' http://server:8080/)
done

echo 'server is up, running client now'

cd /app/src
npm start