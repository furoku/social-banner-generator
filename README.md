# ソーシャルメディア バナー生成ツール

ブログ記事からソーシャルメディア投稿用のバナーを簡単に作成できるWebアプリケーションです。

## 機能

- **テキスト自動抽出**: ブログ本文から重要なテキスト要素（タイトル、サブタイトル、説明文、CTA）を自動的に抽出
- **複数テンプレート**: 様々なデザインパターンから選択可能
- **高度な編集機能**: テキスト、画像、レイアウトを自由にカスタマイズ
- **SNS最適化**: 各ソーシャルメディアプラットフォームに最適化されたサイズでエクスポート
- **プロジェクト管理**: 作成したバナーを保存して後から編集可能

## 技術スタック

- **フロントエンド**: Next.js, React, Tailwind CSS, shadcn/ui
- **バックエンド**: SQLite, Prisma
- **デプロイ**: Vercel (推奨)

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/furoku/social-banner-generator.git
cd social-banner-generator

# 依存関係のインストール
npm install

# データベースのセットアップ
npx prisma migrate dev

# 開発サーバーの起動
npm run dev
```

## 使い方

1. **テキスト入力**: ブログ記事のテキストを入力または貼り付け
2. **テキスト抽出**: 自動抽出されたテキスト要素を確認・編集
3. **テンプレート選択**: 適切なバナーテンプレートを選択
4. **バナー編集**: テキスト、画像、レイアウトをカスタマイズ
5. **エクスポート**: 完成したバナーを各SNS用にエクスポート

## プロジェクト構造

```
/
├── prisma/              # Prismaスキーマと設定
├── public/              # 静的アセット
└── src/
    ├── app/             # ページコンポーネント
    ├── components/      # UIコンポーネント
    │   ├── blog-input/  # ブログ入力関連
    │   ├── editor/      # バナー編集関連
    │   ├── templates/   # テンプレート選択関連
    │   └── ui/          # 基本UIコンポーネント
    ├── lib/             # ユーティリティ関数
    └── types/           # TypeScript型定義
```

## コントリビューション

貢献は大歓迎です！バグレポート、機能リクエスト、プルリクエストなどをお待ちしています。

## ライセンス

MIT

---

このプロジェクトは、ブログ記事からソーシャルメディア投稿用バナーを効率的に作成するための実験的なツールです。