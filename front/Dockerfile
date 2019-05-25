FROM node:10-alpine

WORKDIR /var/www/sistema/

COPY ./employeecrud /var/www/sistema/

RUN npm install

RUN npm install -g @angular/cli

RUN npm rebuild node-sass

CMD ["ng", "serve","--host","0.0.0.0"]