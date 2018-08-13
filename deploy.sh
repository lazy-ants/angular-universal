docker-compose up -d --build
docker exec -ti angular-universal_nodejs npm install
docker exec -ti angular-universal_nodejs bash -c 'npm run build:ssr'
docker exec -ti angular-universal_nodejs bash -c 'npm run serve:ssr'
