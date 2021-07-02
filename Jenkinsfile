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
        
        // stage('Execute Smoke Automation Suite') {
        //     options {
        //         timeout(time: 15, unit: 'MINUTES')   // timeout on this stage
        //     }		
        //     when {
        //         expression {
        //             env.BRANCH_NAME =~ /^(PR-.*$)/
        //         }
        //     }
        //     steps {
        //         echo "i will run some of the steps here"
        //     }
        //     post {
        //         always {
        //             echo "I will execute myself always"
        //         }
        //         success {
        //             echo "I will run ,if it is success"
        //         }
        //         failure {
        //             echo "I will run,If it is failure"
        //         }
        //     }		
        // }

        stage("Build") {
            when {
                expression {
                    BRANCH_NAME == 'truckByPass' | ~ /^(PR-.*$)/
                }
            }
            steps {
                echo 'building the application here to test...'
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