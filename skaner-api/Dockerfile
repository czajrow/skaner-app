FROM node:12

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build-ts

EXPOSE 3000

CMD ["yarn", "start"]
