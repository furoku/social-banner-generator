// src/lib/utils/text-extractor.ts
import { type BlogPostExtract } from '@/types/blog';

/**
 * ブログ本文からタイトル、サブタイトル、説明文、CTAを抽出する
 */
export function extractTextFromBlogContent(content: string): BlogPostExtract {
  // タイトル抽出 - 最初の見出しを探す
  const titleMatch = content.match(/^#\s+(.+)$/m) || 
                     content.match(/^(.+)\n={3,}$/m) ||
                     content.match(/^(.+)\n-{3,}$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // サブタイトル抽出 - 2番目の見出しや強調テキストを探す
  const subtitleMatch = content.match(/^##\s+(.+)$/m) || 
                        content.match(/^\*\*(.+)\*\*$/m);
  const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

  // 説明文抽出 - 最初の段落を取得
  const descriptionMatch = content.match(/^\s*(?!#|>)([^\n]+)(?:\n|$)/m);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';

  // CTA抽出 - リンクや強調テキストを検索
  const ctaMatch = content.match(/\[([^\]]+)\]\([^\)]+\)/m) || 
                   content.match(/>\s*\*\*([^*]+)\*\*\s*</m);
  const cta = ctaMatch ? ctaMatch[1].trim() : '詳細はこちら';

  // 抽出できない場合はヒューリスティックに取得
  // タイトルが取得できない場合は最初の文を使用
  const fallbackTitle = !title ? content.split('\n')[0].slice(0, 60).trim() : '';
  
  // 説明がない場合は冒頭の一部を使用
  const fallbackDescription = !description 
    ? content.replace(/^#.*$/mg, '').trim().split('\n')[0].slice(0, 120) 
    : '';

  return {
    title: title || fallbackTitle,
    subtitle,
    description: description || fallbackDescription,
    cta: cta,
    originalContent: content
  };
}

/**
 * 抽出したテキストから各SNSプラットフォーム向けに最適化された長さに調整する
 */
export function optimizeForPlatform(
  extract: BlogPostExtract, 
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
): BlogPostExtract {
  const maxLengths = {
    twitter: { title: 70, subtitle: 40, description: 200 },
    facebook: { title: 60, subtitle: 30, description: 250 },
    instagram: { title: 50, subtitle: 0, description: 125 },
    linkedin: { title: 80, subtitle: 50, description: 300 }
  };

  const limits = maxLengths[platform];
  
  return {
    ...extract,
    title: extract.title?.slice(0, limits.title),
    subtitle: limits.subtitle > 0 ? extract.subtitle?.slice(0, limits.subtitle) : '',
    description: extract.description?.slice(0, limits.description)
  };
}