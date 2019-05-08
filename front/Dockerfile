FROM node:10-alpine

WORKDIR /var/www/sistema/

COPY ./employeecrud /var/www/sistema/

RUN npm install

RUN npm install -g @angular/cli

CMD ["ng", "serve","--host","0.0.0.0"]