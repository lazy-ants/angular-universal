FROM node:8.9.0

RUN npm install -g pm2
RUN npm install --unsafe-perm -g full-icu

ENV NODE_ICU_DATA="/usr/local/lib/node_modules/full-icu"

WORKDIR /var/www/angular-universal

CMD ["/bin/bash"]
