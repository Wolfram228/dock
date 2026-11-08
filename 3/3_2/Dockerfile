FROM alpine:3.20

#ARG http_proxy=http://172.27.100.5:4444
#ARG https_proxy=http://172.27.100.5:4444

RUN apk add nodejs npm git

WORKDIR /app
RUN git clone https://github.com/MohitMurotiya/2048.git .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
