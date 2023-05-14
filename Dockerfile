FROM node:18-alpine

WORKDIR /workspace

COPY ./app ./

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]