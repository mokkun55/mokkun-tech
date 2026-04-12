---
title: "PrismaでTypeScript製アプリのDBを型安全に操作する"
description: "PrismaのセットアップからCRUD操作、マイグレーションまでを実践的に解説します"
publishDate: 2026-02-03
tags: ["Prisma", "TypeScript", "データベース"]
---

# PrismaでTypeScript製アプリのDBを型安全に操作する

PrismaはTypeScriptと相性抜群のORMです。

## セットアップ

```bash
npm install prisma @prisma/client
npx prisma init
```

## スキーマ定義

```prisma
model Post {
  id          Int      @id @default(autoincrement())
  title       String
  content     String?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

## CRUD操作

```ts
const prisma = new PrismaClient();

// 作成
const post = await prisma.post.create({
  data: { title: "新しい投稿", content: "内容..." },
});

// 取得
const posts = await prisma.post.findMany({
  where: { published: true },
  orderBy: { createdAt: "desc" },
});
```

## マイグレーション

```bash
npx prisma migrate dev --name add-post-table
```

## まとめ

Prismaを使うことで、型安全なDB操作と直感的なスキーマ管理が同時に実現できます。
