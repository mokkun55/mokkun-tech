---
title: "フロントエンドエンジニアのためのDocker入門"
description: "開発環境の統一とデプロイを効率化するDockerの基本的な使い方を解説します"
publishDate: 2026-01-25
tags: ["Docker", "開発環境", "DevOps"]
---

# フロントエンドエンジニアのためのDocker入門

Dockerを使って環境差異のない開発環境を構築しましょう。

## Dockerfileの基本

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## docker-compose

複数のサービスをまとめて管理します。

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: password
```

## よく使うコマンド

```bash
docker compose up -d      # バックグラウンドで起動
docker compose logs -f    # ログを追跡
docker compose down       # 停止・削除
```

## まとめ

Dockerを導入することで「自分の環境では動く」問題を根本から解決できます。
