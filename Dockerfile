FROM jenkins/jenkins:lts-jdk11
LABEL maintainer changbin<changbin@guiji.ai>

USER root
# timezone
# RUN apt-get update && \
#  apt-get install -y tzdata && \
#  ln -sf /usr/share/zoneinfo/Asia/Bangalore /etc/localtime && \
#  echo "Asia/Bangalore" > /etc/timezone
 
 # Install Docker client
ENV DOCKER_BUCKET download.docker.com
ENV DOCKER_VERSION 19.03.8
RUN set -x \
 && curl -fSL "https://${DOCKER_BUCKET}/linux/static/stable/x86_64/docker-$DOCKER_VERSION.tgz" -o docker.tgz \
 && tar -xzvf docker.tgz \
 && mv docker/* /usr/local/bin/ \
 && rmdir docker \
 && rm docker.tgz \
 && docker -v

 #kubectl
# COPY kubectl ./kubectl
# RUN chmod +x kubectl \
#  && mv ./kubectl /usr/local/bin/kubectl
 
 #Switch user to jenkins
 USER jenkins