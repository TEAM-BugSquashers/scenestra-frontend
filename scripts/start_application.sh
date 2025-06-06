#!/bin/bash
cd /home/ec2-user/react-app
source deploy_env.txt

docker stop react-app-container 2>/dev/null || true
docker rm react-app-container 2>/dev/null || true

# 호스트 네트워크 모드로 실행
docker run -d \
  --name react-app-container \
  --network host \
  --restart unless-stopped \
  $IMAGE_URI

echo "Frontend started with host network mode"