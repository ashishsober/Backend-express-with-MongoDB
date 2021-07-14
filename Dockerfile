FROM jenkins/jenkins:lts-jdk11
LABEL maintainer ashish<ashish@gmail.com>

USER root

# timezone
# RUN apt-get update && \
#  apt-get install -y tzdata && \
#  ln -sf /usr/share/zoneinfo/Asia/Bangalore /etc/localtime && \
#  echo "Asia/Bangalore" > /etc/timezone
USER root
RUN apt-get update && \
    apt-get install sudo && \
    yes |apt-get install vim
# system preparation    
RUN sudo apt-get -y install apt-transport-https ca-certificates software-properties-common curl
RUN sudo apt-get update && apt-get install -y apt-transport-https

 # Install Docker client
ENV DOCKER_BUCKET download.docker.com
ENV DOCKER_VERSION 19.03.8
RUN yes|sudo apt install docker.io
# RUN set -x \
#  && curl -fSL "https://${DOCKER_BUCKET}/linux/static/stable/x86_64/docker-$DOCKER_VERSION.tgz" -o docker.tgz \
#  && tar -xzvf docker.tgz \
#  && mv docker/* /usr/local/bin/ \
#  && rmdir docker \
#  && rm docker.tgz \
#  && docker -v

RUN sudo /etc/init.d/docker start
# RUN sudo systemctl enable docker
#  kubectl
COPY kubectl ./kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
RUN chmod +x kubectl \
 && mv ./kubectl /usr/local/bin/kubectl

ENV PATH="${PATH}:/usr/local/bin/docker"
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
 #Switch user to jenkins
USER jenkins