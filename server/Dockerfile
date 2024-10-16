FROM node:16.20.1-alpine as dependencies
WORKDIR /server
COPY package*.json ./
RUN npm ci

FROM node:16.20.1-alpine as builder
WORKDIR /server
COPY . .
ENV mongoDomain=mongodb
RUN rm -rf /server/build
RUN npx tsc