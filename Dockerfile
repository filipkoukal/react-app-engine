FROM node:20-alpine

WORKDIR /app

ADD . /app

RUN cp .env.example .env

RUN npm ci

RUN npm run build

CMD [ "npm", "start" ]
