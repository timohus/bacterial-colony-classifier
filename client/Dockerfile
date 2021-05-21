FROM node:14.15.5 AS base

ARG REACT_APP_API_HOST=http://localhost:9001/
ENV REACT_APP_API_HOST=$REACT_APP_API_HOST

WORKDIR /code
COPY package.json ./
RUN npm install

COPY . ./

FROM base AS build
WORKDIR /code
RUN npm run build

FROM nginx:1.19.6-alpine
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/build /usr/share/nginx/html
