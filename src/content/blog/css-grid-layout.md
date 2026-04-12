---
title: "CSS Gridで作るレスポンシブレイアウト"
description: "CSS Gridの基本から応用まで、実際のレイアウト例を交えて解説します"
publishDate: 2026-03-15
tags: ["CSS", "Grid", "レスポンシブ"]
---

# CSS Gridで作るレスポンシブレイアウト

CSS Gridは二次元レイアウトを直感的に実装できる強力なツールです。

## 基本的な使い方

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

## レスポンシブ対応

`auto-fill` と `minmax` を組み合わせると、メディアクエリなしでレスポンシブになります。

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
```

## エリア指定レイアウト

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
```

## まとめ

CSS Gridを使えば、複雑なレイアウトもシンプルなコードで実現できます。
