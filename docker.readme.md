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
        docker run -p 49155:27107 -d -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network-ash mongo
    # container stop/start-
        docker stop 47837847
        docker start 47837847
    # container removal-
        docker rm -f SOMENAME  
    # To check all the images-
        docker images
    # To list running containers-
        docker ps
        docker ps -a (which will show you all the container,which are running or not- running)
    # To debugg conatiner
        docker logs fa1bbd63de78 |tail
        docker logs 075237d61841 -f
    # to go inside the container
        docker exec -it 47837847id /bin/bash
        root@fa1bbd63de78:/#  $ env (to list down the environment variables)
    # To list the docker network and to create
        docker network ls
        docker network create mongo-network-ash 
    # To run all at once,create a yaml file
       docker-compose -f mongo.yaml up
       docker-compose -f mongo.yaml down    



# What is container
    CONTAINER is a running environment for IMAGE          