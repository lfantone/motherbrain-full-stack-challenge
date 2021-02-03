FROM node:14-alpine AS builder

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . .

CMD ["yarn", "start"]
