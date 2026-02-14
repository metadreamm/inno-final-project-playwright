pipeline {
    agent any

    environment {
        // Credentials stored in Jenkins Credentials Manager
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

        stage('Run Tests in Docker') {
            steps {
                sh '''
                    docker run --rm \
                        -v $(pwd):/app \
                        -w /app \
                        -e USER_EMAIL=$USER_EMAIL \
                        -e USER_PASSWORD=$USER_PASSWORD \
                        -e BASE_URL=$BASE_URL \
                        -e CI=true \
                        mcr.microsoft.com/playwright:v1.48.0-jammy \
                        /bin/bash -c "npm ci && npx playwright test"
                '''
            }
        }
    }

    post {
        always {
            // Generate Allure report from test results
            allure includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
        }
    }
}