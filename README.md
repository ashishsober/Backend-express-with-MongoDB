# Using Express-with-MongoDB #

   https://mlab.com/login/


### Deployed in AWS environment and using Mlab to store the MongoDB data
### How to run

nvm use 20
npm run start-local

target project:              [citric-banner-411512]
target service:              [default]
target version:              [20240204t220704]
target url:                  [https://citric-banner-411512.uc.r.appspot.com]
target service account:      [1896600751-compute@developer.gserviceaccount.com]

## How to deploy

npm run build
npm run deploy

## services running
http://localhost:1337/application/userDetails
https://citric-banner-411512.uc.r.appspot.com/application/userDetails


## gcloud cmds
gcloud components update
gcloud app logs tail -s default