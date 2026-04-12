---
title: "テストブログ"
description: "Astroブログのテスト用ブログです"
publishDate: 2026-04-01
tags: ["astro", "ブログ", "入門"]
---

# はじめてのAstroブログ

Astroのコンテンツコレクション機能を使ってブログを作りました

## コンテンツコレクションとは？

Astroのコンテンツコレクションは、`src/content/` ディレクトリ内のMarkdownや MDXファイルを型安全に管理できる機能です。

主な特徴：

- **型安全**: Zodスキーマでフロントマターを検証
- **自動補完**: TypeScriptの型推論が効く
- **柔軟なクエリ**: `getCollection()` や `getEntry()` でデータ取得

## 基本的な使い方

```typescript
import { getCollection } from "astro:content";

const posts = await getCollection("blog");
```

これだけで全記事を取得できます！`draft: true` の記事を除外したり、日付でソートしたりも簡単です。

## まとめ

Astroのコンテンツコレクションを使うと、ブログ記事を型安全に管理できてとても便利です。
