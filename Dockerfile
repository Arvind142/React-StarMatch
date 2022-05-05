FROM --platform=arm64 node:12.22.12-alpine3.15

COPY ./ /app

WORKDIR /app

EXPOSE 3000

RUN npm install && npm install -g serve && npm run build

CMD [ "serve","-s","build" ]