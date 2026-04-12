---
title: "Tailwind CSSのベストプラクティス"
description: "Tailwind CSSを使ったコンポーネント設計とクラスの管理方法について解説します"
publishDate: 2026-02-18
tags: ["Tailwind CSS", "CSS", "コンポーネント設計"]
---

# Tailwind CSSのベストプラクティス

Tailwind CSSを使いこなすための設計パターンをまとめました。

## コンポーネントの抽出

同じクラスの組み合わせが繰り返す場合はコンポーネント化します。

```tsx
// Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      {children}
    </button>
  );
}
```

## clsx / cvaの活用

条件付きクラスの管理には `clsx` が便利です。

```ts
import clsx from "clsx";

const buttonClass = clsx(
  "px-4 py-2 rounded-lg",
  isDisabled && "opacity-50 cursor-not-allowed",
  isPrimary ? "bg-blue-500" : "bg-gray-200"
);
```

## カスタムテーマ

`tailwind.config.ts` でブランドカラーを定義します。

```ts
theme: {
  extend: {
    colors: {
      brand: "#3b82f6",
    },
  },
},
```

## まとめ

Tailwindは設計方針を統一することで、チームでも一貫したスタイリングが可能になります。
