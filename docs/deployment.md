# Deployment Guide

This document provides instructions for deploying the Music Education Scheduler application to various cloud platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [AWS Deployment](#aws-deployment)
- [Google Cloud Platform Deployment](#google-cloud-platform-deployment)
- [Docker-based Deployment](#docker-based-deployment)
- [CI/CD Setup](#cicd-setup)

## Prerequisites

Before deploying, ensure you have:

1. Built the frontend application:
   ```bash
   cd client
   npm run build
   ```

2. Compiled the backend TypeScript code:
   ```bash
   cd server
   npm run build
   ```

3. Set up environment variables for production (see below)

### Production Environment Variables

Create a `.env` file in the server directory with the following variables:

```
NODE_ENV=production
PORT=5000

# Database Configuration
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=music_scheduler
DB_USER=your-db-user
DB_PASSWORD=your-db-password

# JWT Configuration
JWT_SECRET=your-secure-jwt-secret
JWT_REFRESH_SECRET=your-secure-jwt-refresh-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Redis Configuration (if applicable)
REDIS_HOST=your-redis-host
REDIS_PORT=6379

# Other service credentials
...
```

## AWS Deployment

### Database Setup with Amazon RDS

1. Create a PostgreSQL instance in Amazon RDS
2. Configure security groups to allow access from your application servers
3. Update your `.env` file with the RDS endpoint and credentials

### Redis Cache with Amazon ElastiCache

1. Create a Redis cluster in ElastiCache
2. Configure security groups for access
3. Update your `.env` file with the ElastiCache endpoint

### Backend Deployment with Elastic Beanstalk

1. Install the EB CLI:
   ```bash
   pip install awsebcli
   ```

2. Initialize EB application in the server directory:
   ```bash
   cd server
   eb init
   ```

3. Create an environment and deploy:
   ```bash
   eb create music-scheduler-api-prod
   ```

4. Configure environment variables:
   ```bash
   eb setenv NODE_ENV=production DB_HOST=your-rds-endpoint ...
   ```

### Frontend Deployment with S3 and CloudFront

1. Create an S3 bucket for static hosting
2. Configure the bucket for website hosting
3. Upload the build files:
   ```bash
   aws s3 sync client/build/ s3://your-bucket-name/
   ```

4. Create a CloudFront distribution pointing to the S3 bucket
5. Configure HTTPS and caching settings

## Google Cloud Platform Deployment

### Database Setup with Cloud SQL

1. Create a PostgreSQL instance in Cloud SQL
2. Configure users and passwords
3. Update your `.env` file with the connection details

### Backend Deployment with App Engine

1. Create an `app.yaml` file in the server directory:
   ```yaml
   runtime: nodejs16
   env: standard
   
   instance_class: F2
   
   env_variables:
     NODE_ENV: "production"
     DB_HOST: "/cloudsql/[INSTANCE_CONNECTION_NAME]"
     # Add other environment variables
   
   beta_settings:
     cloud_sql_instances: [INSTANCE_CONNECTION_NAME]
   ```

2. Deploy to App Engine:
   ```bash
   gcloud app deploy
   ```

### Frontend Deployment with Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase in the client directory:
   ```bash
   cd client
   firebase init hosting
   ```

3. Deploy the frontend:
   ```bash
   firebase deploy --only hosting
   ```

## Docker-based Deployment

For containerized deployment using the provided `docker-compose.yml`:

1. Build the images:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

3. For production, modify the compose file to use external services for database and Redis if needed.

## CI/CD Setup

### GitHub Actions

Create a `.github/workflows/deploy.yml` file with appropriate deployment steps for your target platform.

Example for AWS deployment:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install and Build Frontend
        run: |
          cd client
          npm ci
          npm run build
      
      - name: Deploy Frontend to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'client/build'
      
      - name: Install and Build Backend
        run: |
          cd server
          npm ci
          npm run build
      
      - name: Deploy Backend to Elastic Beanstalk
        uses: einaregilsson/beanstalk-deploy@v16
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: music-scheduler
          environment_name: music-scheduler-api-prod
          region: us-east-1
          deployment_package: server-deploy.zip
```

## Monitoring and Logging

- Set up CloudWatch (AWS) or Cloud Monitoring (GCP) for monitoring
- Configure log aggregation for both frontend and backend
- Implement health check endpoints for automated monitoring

## SSL Configuration

- Obtain SSL certificates through AWS Certificate Manager or Let's Encrypt
- Configure HTTPS for all endpoints
- Redirect HTTP traffic to HTTPS

## Backup Strategy

- Configure automated database backups
- Implement backup retention policies
- Test restoration procedures regularly
