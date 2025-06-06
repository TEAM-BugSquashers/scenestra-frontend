# Multi-stage build
FROM node:22-alpine AS builder

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# Vite 빌드
RUN npm run build

# Production stage
FROM nginx:alpine

# 기본 nginx 설정 제거
RUN rm -rf /usr/share/nginx/html/*

# 빌드된 파일들을 nginx 서빙 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]