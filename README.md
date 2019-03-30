# Using Express-with-MongoDB #


### Deployed in AWS environment and using Mlab to store the MongoDB data

## API's Created and deployed in AWS environment

<!-- 1) GET Api of trip summary http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337/truck/tripSummary
2) POST Api of trip summary ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337/truck/tripSummary
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

	      content-type: application/json 	 -->
   
1) GET Api to get All user http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337/register/user
2) POST Api of user http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337/register/user
3) GET http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337/register/users/count
   	
## Steps to be followed while giving build in AWS environment.

	In cmd prompt,steps to be followed
		*ssh -i /Users/ashishgupta/Desktop/Vivek\ Sir/vrdNetworkKeyPair.pem ubuntu@ec2-3-17-146-125.us-east-2.compute.amazonaws.com
		* sudo su
		* cd /home/ubuntu/Backend-express-with-mongo
		* git pull to get the latest
		* ps -ef to check the running port
		* sudo kill 10234 [port number if server is running anyway]
		* sudo nohup node app/server.js 80 &(to run in backgroud)
		* sudo nohup node app/server.js & (to rum in the mentioned port 1337)
		* https://github.com/andrewpuch/aws-ses-node-js-examples

* check in db.js file ,db should point to the mLab database as a prod_url

* How to run the node inspector

        chrome://inspect/#devices

* Open dedicated DevTools for Node


        node --inspect app/server.js


Important link
       
	    https://nodejs.org/en/docs/guides/debugging-getting-started/#enabling-remote-debugging-scenarios

# Status Code 
   
        https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

	    https://myaccount.google.com/lesssecureapps---to remove the security for the nodemailer
	
# Amazon SES MAIL SERVICE
    
	  * https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html
	  * https://aws.amazon.com/premiumsupport/knowledge-center/?icmpid=support_email_category
	  * https://console.developers.google.com/apis/api/plus.googleapis.com/credentials


* https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
* [micro service ] (https://medium.com/@tkssharma/building-microservices-containers-node-js-b74f4e232ec0)
