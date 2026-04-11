# mokkun.tech

## プロジェクト概要

このリポジトリは、もっくんのポートフォリオサイト(https://mokkun.tech)のリポジトリです。

## 使用技術

- Astro
- TypeScript
- ESLint
- Prettier
- Node.js (mise)
- pnpm

## よく使うコマンド

### 依存関係のインストール

`pnpm install`

### 開発サーバー起動

`pnpm dev`
通常は`http://localhost:4321`で起動します。

### ビルド

`pnpm build`

### lint, format, check

`pnpm lint`
`pnpm format`
`pnpm check`

### ディレクトリ構成

このプロジェクトでは、`bulletproof-react` の考え方を参考に、
**機能単位で責務をまとめる feature directory 方針**を採用します。

```text
 src/
 ├─ pages/                  # Astro のルーティング入口
 │  └─ index.astro
 ├─ features/               # 機能単位の実装をまとめる
 │  ├─ home/
 │  │  ├─ components/
 │  │  ├─ data/
 │  │  ├─ types/
 │  │  └─ utils/
 │  └─ profile/
 │     ├─ components/
 │     ├─ data/
 │     ├─ types/
 │     └─ utils/
 ├─ components/             # 複数 feature で共有する UI
 ├─ layouts/                # レイアウト
 ├─ lib/                    # 外部依存や共通ユーティリティ
 ├─ styles/                 # グローバルスタイル
 └─ types/                  # 全体で共有する型定義
```

### 方針

- src/pages/ はルーティングとページ組み立てに集中させます。
- UI やデータ、補助関数はページ直下に散らさず、src/features/ 配下に機能
  単位でまとめます。
- 特定の機能に閉じたコンポーネントは features/[feature]/components/ に置
  きます。
- 複数の機能から再利用するものだけを src/components/ や src/lib/ に切り
  出します。
- まず feature 内に置き、明確に共有が必要になった段階で共通化します。
