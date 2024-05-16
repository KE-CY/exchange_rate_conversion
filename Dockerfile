FROM node:latest

WORKDIR /exchange_rate_conversion


COPY package*.json ./
COPY . .

RUN npm install

ENV PORT 3000

EXPOSE ${PORT}