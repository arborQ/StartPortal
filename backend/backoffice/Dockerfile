FROM node:latest
WORKDIR /backend/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD [ "yarn", "start" ]