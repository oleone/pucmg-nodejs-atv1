FROM node:18-alpine

WORKDIR /app

COPY ./app ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]