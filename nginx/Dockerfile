FROM nginx:1.17.4-alpine

RUN mkdir /etc/nginx/certs/
RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d
COPY ./siemanko.crt /etc/nginx/certs/
COPY ./siemanko.key /etc/nginx/certs/