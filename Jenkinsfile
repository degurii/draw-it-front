pipeline {
    stages {
        stage('Install dependencies') {
            when {
                changeset "package.json"
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build'){
            steps {
                sh 'npm run build'
            }
        }
    }
}