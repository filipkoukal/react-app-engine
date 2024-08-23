FROM node:20-alpine

WORKDIR /app

ADD . /app

RUN cp .env.example .env

RUN npm ci --legacy-peer-deps

RUN npm run build

EXPOSE 3000 8080

CMD ["sh", "-c", "npm run db & npm start"]
