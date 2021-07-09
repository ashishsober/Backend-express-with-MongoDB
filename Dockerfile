FROM jenkins/jenkins:lts-jdk11

USER root

#install docker
RUN apt-get update && \
       apt-get -y install apt-transport-https \
       ca-certificates \
       curl \
       gnupg2 \
       software-properties-common && \
       curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
       add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
       $(lsb_release -cs) \
       stable" && \
       apt-get update && \
       apt-get -y install docker-ce

#ensures that /var/run/docker.sock exists
RUN touch /var/run/docker.sock

#changes the ownership of /var/run/docker.sock
RUN chown root:docker /var/run/docker.sock

#gives jenkins user permissions to access /var/run/docker.sock
RUN usermod -a -G docker jenkins

USER jenkins