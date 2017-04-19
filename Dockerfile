FROM nginx:alpine
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY dist/ /usr/app
RUN ls
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 4000
