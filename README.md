# Angular Universal: server-side rendering

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

- in prod mode

```
docker-compose up -d --build
docker exec -ti angular-universal_nodejs npm install
docker exec -ti angular-universal_nodejs bash -c 'npm run build:ssr'
docker exec -ti angular-universal_nodejs bash -c 'npm run serve:ssr'
```
