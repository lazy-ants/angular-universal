# Angular Universal: server-side rendering [![CircleCI](https://circleci.com/gh/lazy-ants/angular-universal/tree/master.svg?style=svg)](https://circleci.com/gh/lazy-ants/angular-universal/tree/master)

## CLONE REPO

```
git clone git@github.com:lazy-ants/angular-universal.git
cd angular-universal
```

## CREATE APP CONFIG FILES

```
cp docker/nginx/nginx.conf.dist docker/nginx/nginx.conf
cp docker-compose.override.yml.dist docker-compose.override.yml
```

## BUILD APPLICATION

- in dev mode

```
docker-compose up -d --build
docker exec -ti angular-universal_nodejs npm install
docker exec -ti angular-universal_nodejs bash -c 'npm start'
```

- in prod mode (bash deploy.sh as quick solution)

```
docker-compose up -d --build
docker exec -ti angular-universal_nodejs npm install
docker exec -ti angular-universal_nodejs bash -c 'npm run build:ssr'
docker exec -ti angular-universal_nodejs bash -c 'npm run serve:ssr'
```
