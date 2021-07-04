//Here can be seen all the JENKINS ENVIORNMANT VARIABLE,WHICH CAN BE BINDED OVER TO THIS FILE
// http://localhost:8080/env-vars.html/
// groovy

pipeline {
    agent any
    environment {
        NEW_VERSION = '1.3.0'
        // SERVER_CREDENTIALS = credentials('global')
        registry = "laxmi/backend-app-with-esp" 
        registry_url = "laxmi.azurecr.io"
        registryCredential = 'ACR'
        dockerImage = '' 
    }
    stages {

        stage("Initialize") {
            def dockerHome = tool 'myDocker'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }

        stage("Checkout'") {
            checkout scm
        }

        stage("Sonar") {
            when {
                expression {
                    BRANCH_NAME ==~ /(truckByPass|^(PR-.*$))/ 
                }
            }
            steps {
                echo 'sonar the application...'
            }
        }

        stage("Build Docker Image") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage("Push Image to container") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass'
                }
            }
            steps {
                echo 'Push the image here'
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

// post {
//                 always {
//                     allure report: 'allure-reports', results: [[path: 'allure-results']]
//                 }
//                 success {
//                     mail to: "hemant.rathore@optum.com, sumitranjan@optum.com", subject: "SUCCESS: Smoke Automation Suite!!! Build Time: $BUILD_TIMESTAMP",
//                             body: "Pls see the Allure Reports. \n\n ${env.JOB_URL}${env.BUILD_NUMBER}/artifact"
//                 }
//                 failure {
//                     mail to: "hemant.rathore@optum.com, sumitranjan@optum.com", subject: "FAILURE: Smoke Automation Suite!!! Build Time: $BUILD_TIMESTAMP",
//                             body: "Pls check the Automation Report and take necessary actions. \n\n ${env.JOB_URL}${env.BUILD_NUMBER}/artifact"
//                 }
//             }