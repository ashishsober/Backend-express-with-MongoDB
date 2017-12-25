# Using Express-with-MongoDb #


### Deployed in AWS environment and using Mlab to store the MongoDB data

## API's Created and deployed in AWS environment

1) GET Api of trip summary http://ec2-52-42-15-201.us-west-2.compute.amazonaws.com/truck/tripSummary
2) POST Api of trip summary http://ec2-52-42-15-201.us-west-2.compute.amazonaws.com/truck/tripSummary
3) GET Api to get All user http://ec2-52-42-15-201.us-west-2.compute.amazonaws.com/register/user

## Steps to be followed while giving build in AWS environment.

	In cmd prompt,steps to be followed

		* cd /home/ubuntu/Backend-express-with-mongo
		* git pull to get the latest
		* ps -ef to check the running port
		* sudo kill 10234 [port number if server is running anyway]
		* sudo nohup node server.js &(to run in backgroud)

* check in db.js file ,db should point to the mLab database as a prod_url
