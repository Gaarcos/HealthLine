pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/usuario/repositorio.git'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                // Adicione os passos para realizar o deploy do seu projeto, por exemplo, usando SCP, S3, ou outro serviço.
            }
        }
    }
}