FROM node:16.19-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp
RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package*.json .
COPY pnpm* .
COPY .npmrc .
RUN pnpm i

COPY src ./src
COPY tsconfig.json .
COPY .eslintrc.js .
COPY .env .

CMD pnpm start