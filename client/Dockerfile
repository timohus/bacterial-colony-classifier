FROM node:14.15.5 AS base
ARG REACT_APP_API_URL=http://localhost:3030
ENV REACT_APP_API_URL=$REACT_APP_API_URL
WORKDIR /code
COPY package.json ./
RUN npm install
COPY . ./

FROM base AS build
ARG REACT_APP_API_URL=http://localhost:3030
ENV REACT_APP_API_URL=$REACT_APP_API_URL
WORKDIR /code
RUN npm run build

FROM nginx:1.19.6-alpine
EXPOSE 3000
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/build /usr/share/nginx/html
