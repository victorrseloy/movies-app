FROM node:8.11.3-alpine

WORKDIR /usr/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn","start"]
