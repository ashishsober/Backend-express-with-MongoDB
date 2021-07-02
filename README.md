# Using Express-with-MongoDB #

   https://mlab.com/login/


### Deployed in AWS environment and using Mlab to store the MongoDB data

## API's Created and deployed in AWS environment
1) http://ec2-3-138-199-39.us-east-2.compute.amazonaws.com:1337/application/jobVrd
   	
## Steps to be followed while giving build in AWS environment.

	In cmd prompt,steps to be followed
		* chmod 400 vrdNetworkKeyPair.pem
		* ssh -v -i "vrdNetworkKeyPair.pem" ubuntu@ec2-3-138-199-39.us-east-2.compute.amazonaws.com
		* sudo su
		* cd /home/ubuntu/Backend-express-with-mongo
		* git pull to get the latest
		* ps -ef to check the running port
		* sudo kill 10234 [port number if server is running anyway]
		* sudo nohup node dist/server.js 80 &(to run in backgroud)
		* sudo nohup node dist/server.js & (to rum in the mentioned port 1337)
		* For typescript project npm run start &
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
