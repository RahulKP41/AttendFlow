pipeline {

    agent any

    environment {
        DOCKER_USERNAME = "rahulkp440"

        BACKEND_IMAGE = "rahulkp440/attendflow-backend"
        FRONTEND_IMAGE = "rahulkp440/attendflow-frontend"

        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm test || true'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh """
                    docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    -t ${BACKEND_IMAGE}:latest .
                    """
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh """
                    docker build \
                    -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    -t ${FRONTEND_IMAGE}:latest .
                    """
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                withDockerRegistry(
                    [credentialsId: 'dockerhub']
                ) {

                    sh """
                    docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker push ${BACKEND_IMAGE}:latest
                    """

                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                withDockerRegistry(
                    [credentialsId: 'dockerhub']
                ) {

                    sh """
                    docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker push ${FRONTEND_IMAGE}:latest
                    """

                }
            }
        }

        stage('Deploy Application') {
            steps {

                sh """
                docker compose down
                docker compose pull
                docker compose up -d
                """

            }
        }

        stage('Cleanup') {
            steps {

                sh '''
                docker image prune -f
                '''

            }
        }

    }

    post {

        success {

            echo "=================================="
            echo "Pipeline Completed Successfully"
            echo "=================================="

        }

        failure {

            echo "=================================="
            echo "Pipeline Failed"
            echo "=================================="

        }

        always {

            cleanWs()

        }

    }

}