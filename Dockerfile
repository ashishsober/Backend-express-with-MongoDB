FROM node:13.12.0-alpine

# EXPOSE  8080

USER root

# Set env variables for node app
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

# Define working directory and copy source files in
WORKDIR /www
COPY . /www

#give permissions to procfile
RUN chmod 755 /www/procfile
RUN chmod 777 /var/run/docker.sock

# install deps
RUN cd /www
RUN npm install
# RUN npm run express
# RUN npm install -g webpack-cli

RUN ls -l

RUN chmod -R a+rw /www
CMD /www/procfile
