echo 'Before checkout'
git status
git checkout -- .
echo 'After checkout'
git pull origin master
docker-compose up -d --build
docker exec -i angular-universal_nodejs npm install
docker exec -i angular-universal_nodejs bash -c 'npm run build:ssr'
docker exec -i angular-universal_nodejs bash -c 'npm run serve:ssr'
