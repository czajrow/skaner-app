FROM node:12

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build-ts

EXPOSE 3001

CMD ["yarn", "start"]
