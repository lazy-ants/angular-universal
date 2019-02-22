FROM node:10.15.1

RUN npm install -g pm2
RUN npm install --unsafe-perm -g full-icu

ENV NODE_ICU_DATA="/usr/local/lib/node_modules/full-icu"

WORKDIR /var/www/example.web

CMD ["/bin/bash"]
