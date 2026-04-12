---
title: "Viteで爆速フロントエンド開発環境を構築する"
description: "Viteによるモダンなフロントエンドビルドツールのセットアップと設定方法を紹介します"
publishDate: 2026-02-25
tags: ["Vite", "ビルドツール", "開発環境"]
---

# Viteで爆速フロントエンド開発環境を構築する

ViteはネイティブESモジュールを活用した超高速なビルドツールです。

## プロジェクト作成

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

## パスエイリアスの設定

```ts
// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

## 環境変数

`.env` ファイルで管理し、`VITE_` プレフィックスが必要です。

```
VITE_API_URL=https://api.example.com
```

```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

## まとめ

Viteを使うことで、開発サーバーの起動やHMRが劇的に速くなります。
