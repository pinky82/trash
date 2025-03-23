#!/bin/bash

echo "Stopping databases..."

# 停止并移除容器
docker-compose down

echo "All databases have been stopped!" 