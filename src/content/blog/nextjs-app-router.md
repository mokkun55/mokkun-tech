---
title: "Next.js App Routerへの移行ガイド"
description: "Pages RouterからApp Routerへの移行手順と注意点をまとめました"
publishDate: 2026-03-10
tags: ["Next.js", "App Router", "React"]
---

# Next.js App Routerへの移行ガイド

Next.js 13から導入されたApp Routerは、Server Componentsを活用した新しいアーキテクチャです。

## 主な変更点

### ファイル構成

```
app/
  layout.tsx     # ルートレイアウト
  page.tsx       # ルートページ
  blog/
    page.tsx     # /blog ページ
    [slug]/
      page.tsx   # /blog/:slug ページ
```

### Server Components

デフォルトでServer Componentになります。

```tsx
// サーバーサイドでデータ取得
async function BlogPage() {
  const posts = await fetchPosts();
  return <PostList posts={posts} />;
}
```

### Client Components

インタラクションが必要な場合は `"use client"` を追加します。

```tsx
"use client";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## まとめ

App Routerへの移行は段階的に進められるので、既存プロジェクトでも安心して試せます。
