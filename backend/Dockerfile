FROM node:12

WORKDIR /home/app/backend

RUN npm i -g nodemon
RUN npm i -g concurrently

COPY ./package* ./

RUN npm i