FROM nginx

COPY ./vox/dist/ /app/
COPY ./conf/nginx/ /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
WORKDIR /app

