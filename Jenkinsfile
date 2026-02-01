pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        USER_EMAIL = credentials('AMAZON_EMAIL')
        USER_PASSWORD = credentials('AMAZON_PASSWORD')
        BASE_URL = 'https://www.amazon.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            allure includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
        }
    }
}