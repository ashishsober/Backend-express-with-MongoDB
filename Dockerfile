# as this is a javascript application
FROM node:13.12.0-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

RUN mkdir -p /home/app
COPY . /
 
CMD ["npm","run","start"] 
