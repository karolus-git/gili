## Fichier : ./react-docker/Dockerfile
FROM node:19.8.1

WORKDIR /usr/src/app/react-app

COPY package*.json ./

RUN yarn install

COPY src ./src
COPY public ./public

EXPOSE 3000

CMD ["yarn", "start"]