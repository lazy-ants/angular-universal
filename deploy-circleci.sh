#!/bin/bash
docker-compose up -d --build
docker exec -i angular-universal_nodejs npm install
docker exec -i angular-universal_nodejs bash -c 'npm run build:ssr'
docker exec -i angular-universal_nodejs bash -c 'npm run serve:ssr'
