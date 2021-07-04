pipeline {
    agent { label 'docker-automation-image' }
    triggers {
        cron('30 21 * * *')
    }
    options {
        // Keep the 10 most recent builds
        buildDiscarder(logRotator(numToKeepStr: '20'))
        //timeout(time: 40, unit: 'MINUTES')
    }
    environment {
        branch = "${env.BRANCH_NAME}"
        def runEnv = 'cicd'
        def runEnvCron = 'cron'
        //branch = 'dev'
        LANG = 'en_US.utf-8'
        LC_ALL = 'en_US.utf-8'
        scmUrl = 'https://github.optum.com/OMMS/OMMS-PE-UI-Automation.git'
        gitcredsid = 'Github-ID'
    }


    stages {
        stage('Execute Smoke Automation Suite') {
            options {
                timeout(time: 15, unit: 'MINUTES')   // timeout on this stage
            }		
            when {
                expression {
                    env.BRANCH_NAME =~ /^(PR-.*$)/
                }
            }
            steps {
                automation_env_setup()
                sh '''
		          chmod +x run_test.sh
                  ./run_test.sh ${runEnv}
                '''
            }
            post {
                always {
                    allure report: 'allure-reports', results: [[path: 'allure-results']]
                }
                success {
                    mail to: "hemant.rathore@optum.com, sumitranjan@optum.com", subject: "SUCCESS: Smoke Automation Suite!!! Build Time: $BUILD_TIMESTAMP",
                            body: "Pls see the Allure Reports. \n\n ${env.JOB_URL}${env.BUILD_NUMBER}/artifact"
                }
                failure {
                    mail to: "hemant.rathore@optum.com, sumitranjan@optum.com", subject: "FAILURE: Smoke Automation Suite!!! Build Time: $BUILD_TIMESTAMP",
                            body: "Pls check the Automation Report and take necessary actions. \n\n ${env.JOB_URL}${env.BUILD_NUMBER}/artifact"
                }
            }		
        }
        stage('Execute Complete Automation Suite') {
            options {
                timeout(time: 120, unit: 'MINUTES')   // timeout on this stage
            }		
            when {
                expression {
                    !(env.BRANCH_NAME =~ /^(PR-.*)$/)
                }
            }
            steps {
                automation_env_setup()
                sh '''
		          chmod +x run_test.sh
                  ./run_test.sh ${runEnvCron}
                '''
            }
            post {
                always {
                    allure report: 'allure-reports', results: [[path: 'allure-results']]
                }
                success {
                    mail to: "hemant.rathore@optum.com, sumitranjan@optum.com", subject: "SUCCESS: E2E_Automation!!! Build Time: $BUILD_TIMESTAMP",
                            body: "Pls see the Allure Reports. \n\n ${env.JOB_URL}${env.BUILD_NUMBER}/artifact"
                }
                failure {
                    mail to: "hemant.rathore@optum.com, sumitranjan@optum.com", subject: "FAILURE: E2E_Automation!!! Build Time: $BUILD_TIMESTAMP",
                            body: "Pls check the Automation Report and take necessary actions. \n\n ${env.JOB_URL}${env.BUILD_NUMBER}/artifact"
                }
            }		
        }
    }
    /*post {
        always {
            allure report: 'allure-reports', results: [[path: 'allure-results']]
        }
        success {
            mail to: "prabu.saravana@optum.com, hemant.rathore@optum.com, sumitranjan@optum.com", subject: "SUCCESS: ${currentBuild.fullDisplayName}",
                    body: "Pls see the Allure Reports"
        }
        failure {
            mail to: "prabu.saravana@optum.com, hemant.rathore@optum.com, sumitranjan@optum.com", subject: "FAILURE: ${currentBuild.fullDisplayName}",
                    body: "Pls check the Automation Report and take necessary actions. \n\n ${env.JOB_URL}${env.BUILD_NUMBER}/artifact"
        }
    }*/
}

def automation_env_setup() {
      withEnv([
          'NPM_EMAIL=prabu.saravana@optum.com',
          'NPM_AUTH_KEY=aW5kaV9idWlsZF91c2VyOkFQMmlFUEVoVmdiU21zWlJwemhTSkhrZ1NQZw==',
          'CHROME_BIN=/usr/local/bin/chromedriver']) {
      	      def node = tool name: 'NODE_JS_12.15.0', type: 'nodejs'
	      env.PATH = "${CHROME_BIN}:${env.PATH}:/usr/bin/google-chrome:${node}/bin"
      sh '''
        node -v
        npm config set registry https://repo1.uhc.com/artifactory/api/npm/npm-virtual/
        npm -v
        npm install
        npm install -g protractor
        #webdriver-manager clean
        webdriver-manager update --versions.chrome 81.0.4044.69 --ignore_ssl --gecko=false
        ls -l
      '''
    }
}
