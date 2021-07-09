    Docker user id: ashishwork16

# devspace 
	https://hub.docker.com/ 
	devspace use namespace omms-pep-dev
	devspace dev

# Docker command

# To pull the image from the repository to local
    docker pull image_name
    docker inspect e17e2f5a0745
# To run the conatiner for the image
    docker run redis
    docker run redis:4.0
    docker run -d -p 80(host):80(container port) --name getting-started docker/getting-started
    docker run -d redis (it will give the id with conatiner running)
    
    docker run -d \
    -p 27017:27107 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    --name mongodb \
    --net mongo-network-ash mongo

    docker run -d \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
    -e ME_CONFIG_MONGODB_SERVER=mongodb \
    --net mongo-network-ash \
    -p 8081:8081 mongo-express

    docker run -d -p 1200:1200 --net mongo-network-ash laxmi.azurecr.io/backend-app-with-esp:latest
    docker run -d -p 3000:3000 --net mongo-network-ash laxmi.azurecr.io/eco-ui:latest
    
    docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3-management

    username:admin ,password:admin
    docker run -d \
    -p 8080:8080 \
    -p 50000:50000 \
    -v jenkins_home:/var/jenkins_home \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $(which docker):/usr/bin/docker jenkins/jenkins
    
    docker run -u 0 --privileged --name jenkins -it -d -p 8080:8080 -p 50000:50000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $(which docker):/usr/bin/docker \
    -v $PWD/jenkins_home:/var/jenkins_home \
    jenkins/jenkins:lts-jdk11
    
    
    docker run -d \
    -p 9000:9000 \
    sonarqube:latest
    * http://localhost:9000/dashboard?id=1234abcd

# container stop/start-
    docker stop 47837847
    docker start 47837847
# container removal-
    docker ps -a | grep my-app
    docker rm -f SOMENAME
    docker rmi 1c791fef09b0
# To check all the images-
    docker images
# To list running containers-
    docker ps
    docker ps -a (which will show you all the container,which are running or not- running)
    docker ps -a | grep my-app
# To debugg conatiner
    docker logs fa1bbd63de78 |tail
    docker logs 075237d61841 -f
# To go inside the container
    docker exec -it 7629ec9559a0 sh
    docker exec -it 9bc9b00b2008 /bin/bash
    root@fa1bbd63de78:/#  $ env (to list down the environment variables)
# To list the docker network and to create
    docker network ls
    docker network create mongo-network-ash 
# To run all at once,create a yaml file
    docker-compose -f mongo.yaml up
    docker-compose -f mongo.yaml down 

# Docker volumes for data persistence  
# To build the docker image
    docker build -t ash-jenkins-docker:latest .
    // dockerImage = docker.build registry + ":$BUILD_NUMBER" 

# To push image to container registry
    az login
    az acr login --name laxmi.azurecr.io
    docker login laxmi.azurecr.io (username and password get it from access keys)(should be at vpn)
    # Tag the image from local to host
    docker tag ashish/jenkins-docker:latest laxmi.azurecr.io/ashish/jenkins-docker:latest
    docker images
    docker push laxmi.azurecr.io/ashish/jenkins-docker:latest
    az acr list --resource-group omms-pep-weekly --output table


# What is container
CONTAINER is a running environment for IMAGE    

# What is whitelist
    could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.

#
newgrp docker
sudo usermod -aG docker $USER
ps 