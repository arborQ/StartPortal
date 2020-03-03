FROM node:latest
WORKDIR /frontend-vue/app/

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .

CMD [ "yarn", "start" ]