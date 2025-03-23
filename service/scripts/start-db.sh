#!/bin/bash

# 确保脚本在错误时停止执行
set -e

echo "Starting databases..."

# 启动 Docker Compose
docker-compose up -d

# 等待数据库准备就绪
echo "Waiting for PostgreSQL to be ready..."
until docker exec trash-postgres pg_isready -U postgres > /dev/null 2>&1; do
  echo -n "."
  sleep 1
done
echo "PostgreSQL is ready!"

echo "Waiting for Redis to be ready..."
until docker exec trash-redis redis-cli ping > /dev/null 2>&1; do
  echo -n "."
  sleep 1
done
echo "Redis is ready!"

echo "All databases are up and running!" 