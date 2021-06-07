// http://localhost:8080/env-vars.html/
// groovy

pipeline {
    agent any
    environment {
        NEW_VERSION = '1.3.0'
        SERVER_CREDENTIALS = credentials('global')
    }
    
    stages {

        stage("build") {
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

        stage("sonar") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'sonar the application...'
            }
        }

        stage("deployment") {
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