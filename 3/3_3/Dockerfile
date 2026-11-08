FROM alpine:3.20

#ARG http_proxy=http://172.27.100.5:4444
#ARG https_proxy=http://172.27.100.5:4444
#ENV http_proxy=$http_proxy
#ENV https_proxy=$https_proxy

RUN apk add nodejs npm git

WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/entrypoint.sh"]
