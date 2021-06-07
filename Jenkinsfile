// http://localhost:8080/env-vars.html/
// groovy

pipeline {
    agent any
    environment {
        NEW_VERSION = '1.3.0'
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

        stage("test") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'testing the application...'
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

// post {
//         always {

//         }
//         success {

//         }
//         failure {

//         }
//     }