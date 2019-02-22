#!/bin/bash
docker-compose up -d --build
docker exec -i example-web_nodejs npm install
docker exec -i example-web_nodejs bash -c 'npm run build:ssr'
docker exec -i example-web_nodejs bash -c 'npm run serve:ssr'
