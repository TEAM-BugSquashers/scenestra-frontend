#!/bin/bash
cd /home/ec2-user/react-app

# BuildOutput에서 이미지 URI 읽기
if [ -f "deploy_env.txt" ]; then
    source deploy_env.txt
    echo "Using image: $IMAGE_URI"
else
    echo "deploy_env.txt not found!"
    exit 1
fi

# ECR 로그인
AWS_REGION=ap-northeast-2
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(echo $IMAGE_URI | cut -d'/' -f1)

# 이미지 풀
docker pull $IMAGE_URI