FROM nginx:1.17.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

# COPY --from=build-frontend /home/app/frontend/build /var/w