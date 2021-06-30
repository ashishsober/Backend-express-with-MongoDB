//Here can be seen all the JENKINS ENVIORNMANT VARIABLE,WHICH CAN BE BINDED OVER TO THIS FILE
// http://localhost:8080/env-vars.html/
// groovy

pipeline {
    agent any
    environment {
        NEW_VERSION = '1.3.0'
        // SERVER_CREDENTIALS = credentials('global')
    }
    stages {

        stage("Build") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'building the application...'
                echo "building with version ${NEW_VERSION}"
            }
        }

        stage("Sonar") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'sonar the application...'
            }
        }

        stage("Docker Build Image") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'Building the image... docker build -t backend-app-with-esp:latest .'
            }
        }

        stage("Push Image to container") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'Pushing the image to the laxmi container in azure container registry...'
            }
        }

        stage("Deployment") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'deploying the application..'
            }
        }
    }
}


// SERVER_CREDENTIALS = credentials('global')
// post {
//         always {

//         }
//         success {

//         }
//         failure {

//         }
//     }