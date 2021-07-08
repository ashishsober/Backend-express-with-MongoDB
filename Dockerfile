FROM jenkins/jenkins:lts
MAINTAINER ashish.work16@gmail.com
USER root

# Install the latest Docker CE binaries
RUN apt-get update \
      && apt-get install -y sudo \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
USER jenkins