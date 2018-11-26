# Using Express-with-MongoDB #


### Deployed in AWS environment and using Mlab to store the MongoDB data

## API's Created and deployed in AWS environment

1) GET Api of trip summary http://ec2-52-42-15-201.us-west-2.compute.amazonaws.com/truck/tripSummary
2) POST Api of trip summary http://ec2-52-42-15-201.us-west-2.compute.amazonaws.com/truck/tripSummary
    * schema to use or sent the data:

    Mock data ,set in body section :   
	    
			{
				"truckNo": "UP78-1190",
				"status": "Completed",
				"tripDetails": {
					"from": "Bangalore",
					"to": "Kanpur",
					"startDate": "26-12-2018",
					"endDate": "29-12-2018"
				},
				"partyDetails": {
					"soldToParty": "Laxmi Enterprises",
					"contactDetails": 9900543957,
					"amount": 420,
					"paid": "unPaid"
				}
			}

	Headers :

	      content-type: application/json 	
   
3) GET Api to get All user http://ec2-52-42-15-201.us-west-2.compute.amazonaws.com/register/user
3) POST Api of user http://ec2-52-42-15-201.us-west-2.compute.amazonaws.com/register/user
    * schema to use or sent the data:
       
	Mock data ,set in body section :

	       {
				"first_name":"ajhjhjhkjhkj",
				"last_name":"asasdsdsd",
				"email":"tulli123@gmail.com",
				"username":"tull123i",
				"password":"sdss",
				"passwordConf":"sd"
			}
	Headers :

	      content-type: application/json		
## Steps to be followed while giving build in AWS environment.

	In cmd prompt,steps to be followed

		* cd /home/ubuntu/Backend-express-with-mongo
		* git pull to get the latest
		* ps -ef to check the running port
		* sudo kill 10234 [port number if server is running anyway]
		* sudo nohup node server.js &(to run in backgroud)

* check in db.js file ,db should point to the mLab database as a prod_url

* How to run the node inspector
     chrome://inspect/#devices
* Open dedicated DevTools for Node
      node --inspect app/server.js


Important link https://nodejs.org/en/docs/guides/debugging-getting-started/#enabling-remote-debugging-scenarios