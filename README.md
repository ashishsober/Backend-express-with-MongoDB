# Using Express-with-MongoDb #


### Deployed in AWS environment and using Mlab to store the MongoDB data

## API's Created and deployed in AWS environment

1) GET Api of trip summary http://ec2-34-209-31-131.us-west-2.compute.amazonaws.com/truck/tripSummary
2) POST Api of trip summary http://ec2-34-209-31-131.us-west-2.compute.amazonaws.com/truck/tripSummary
3) GET Api to get All user http://ec2-34-209-31-131.us-west-2.compute.amazonaws.com/register/user

## Steps to be followed while giving build in AWS environment.

	Log in from putty

		* ubuntu@ec2-34-209-31-131.us-west-2.compute.amazonaws.com
		* and browse the .ppk file and hit OPEN

	In cmd prompt,steps to be followed

		* cd /home/ubuntu/project/Backend-express-with-mongo
		* git pull to get the latest
		* sudo kill 10234 [port number if server is running anyway]
		* sudo node server.js &(to run in backgroud)

