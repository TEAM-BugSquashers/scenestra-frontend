#!/bin/bash
cd /home/ec2-user/react-app

# 환경 변수 로드
source deploy_env.txt

# 새 컨테이너 실행
docker run -d \
  --name react-app-container \
  -p 80:80 \
  --restart unless-stopped \
  $IMAGE_URI

echo "Application started with image: $IMAGE_URI"