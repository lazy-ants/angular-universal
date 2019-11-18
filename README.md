# Example web site: server-side rendering

## CREATE APP CONFIG FILES

```
cp docker/nginx/nginx.conf.dist docker/nginx/nginx.conf
cp docker-compose.override.yml.dist docker-compose.override.yml
```

## BUILD APPLICATION

- in dev mode

```
docker-compose up -d --build
docker exec -ti example-web_nodejs npm install
docker exec -ti example-web_nodejs bash -c 'npm start'
```

- in prod mode (bash deploy.sh as quick solution)

```
docker-compose up -d --build
docker exec -ti example-web_nodejs npm install
docker exec -ti example-web_nodejs bash -c 'npm run build:ssr'
docker exec -ti example-web_nodejs bash -c 'npm run serve:ssr'
```
