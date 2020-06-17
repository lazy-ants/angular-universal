# Angular 9. Server-side rendering

## CREATE APP CONFIG FILES

```
cp docker/nginx/nginx.conf.dist docker/nginx/nginx.conf
cp docker-compose.override.yml.dist docker-compose.override.yml
```

## BUILD APPLICATION

- in dev mode

```
docker-compose up -d --build
docker exec -ti <nodejs-docker-container> bash -c 'npm install'
docker exec -ti <nodejs-docker-container> bash -c 'npm run start:ssr'
```

- in prod mode

```
docker-compose up -d --build
docker exec -ti <nodejs-docker-container> bash -c 'npm install'
docker exec -ti <nodejs-docker-container> bash -c 'npm run build:ssr'
docker exec -ti <nodejs-docker-container> bash -c 'npm run serve:ssr'
```
