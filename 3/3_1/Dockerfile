FROM alpine:3.20

#ARG http_proxy=http://172.27.100.5:4444
#ARG https_proxy=http://172.27.100.5:4444

RUN apk add nodejs npm

WORKDIR /app
COPY 2048/ /app/
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
