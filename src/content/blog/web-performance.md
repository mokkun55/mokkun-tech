---
title: "Webパフォーマンス最適化入門"
description: "Core Web Vitalsを改善するための具体的な手法とツールを紹介します"
publishDate: 2026-02-10
tags: ["パフォーマンス", "Core Web Vitals", "最適化"]
---

# Webパフォーマンス最適化入門

ユーザー体験に直結するWebパフォーマンスの改善方法を解説します。

## Core Web Vitals

Googleが定義する3つの指標です。

- **LCP** (Largest Contentful Paint): 2.5秒以内
- **FID** (First Input Delay): 100ms以内
- **CLS** (Cumulative Layout Shift): 0.1以下

## 画像の最適化

```html
<!-- 遅延読み込み -->
<img src="hero.webp" loading="lazy" alt="ヒーロー画像" />

<!-- レスポンシブ画像 -->
<img
  srcset="small.webp 480w, medium.webp 1024w"
  sizes="(max-width: 480px) 480px, 1024px"
  src="medium.webp"
  alt="レスポンシブ画像"
/>
```

## コード分割

動的インポートで初期ロードを削減します。

```ts
const HeavyComponent = lazy(() => import("./HeavyComponent"));
```

## まとめ

パフォーマンス改善はLighthouseで計測しながら、優先度の高い項目から取り組むのがおすすめです。
