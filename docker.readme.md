    Docker user id: ashishwork16

# devspace 
	https://hub.docker.com/ 
	devspace use namespace omms-pep-dev
	devspace dev

# Docker command

    # To pull the image from the repository to local
        docker pull image_name
    # To run the conatiner for the image
        docker run redis
        docker run redis:4.0
        docker run -d -p 80:80(container port) --name getting-started docker/getting-started
        docker run -d redis (it will give the id with conatiner running)
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
        docker logs fa1bbd63de78
    # to go inside the container
        docker exec -it 47837847id /bin/bash
        root@fa1bbd63de78:/#  $ env (to list down the environment variables)



# What is container
    CONTAINER is a running environment for IMAGE          