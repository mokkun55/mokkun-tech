# Astro ページネーション実装メモ

最終更新: 2026-04-15

---

## 対象ページ

`src/pages/works/` に実装予定。

---

## ファイル構成

```
src/pages/works/
├── index.astro      ← /works/1 へリダイレクト
└── [page].astro     ← ページネーション本体（/works/1, /works/2, ...）
```

---

## 実装の要点

### `[page].astro` での実装

```astro
---
export async function getStaticPaths({ paginate }) {
  const works = (await getCollection("work", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  return paginate(works, { pageSize: 6 });
}

const { page } = Astro.props;
---
```

### `page` オブジェクトの主なプロパティ

| プロパティ         | 内容                                  |
| ------------------ | ------------------------------------- |
| `page.data`        | 現在ページのアイテム配列              |
| `page.currentPage` | 現在のページ番号（1始まり）           |
| `page.lastPage`    | 最終ページ番号                        |
| `page.url.prev`    | 前ページのURL（なければ `undefined`） |
| `page.url.next`    | 次ページのURL（なければ `undefined`） |

### `index.astro` でリダイレクト

```astro
---
return Astro.redirect("/works/1");
---
```

---

## 参考

- [Astro公式: Pagination](https://docs.astro.build/en/guides/routing/#pagination)
