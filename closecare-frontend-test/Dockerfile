FROM node:10.18.1 as node

MAINTAINER Guilherme Euzebio

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.1-alpine

COPY --from=node /app/dist/closecare-frontend-test /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
