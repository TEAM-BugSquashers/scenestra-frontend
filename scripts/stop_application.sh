#!/bin/bash
# 기존 컨테이너 중지 및 제거
docker stop react-app-container 2>/dev/null || true
docker rm react-app-container 2>/dev/null || true
echo "Application stopped"