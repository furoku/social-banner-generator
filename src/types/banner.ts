// src/types/banner.ts
export interface BannerTemplateData {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  width: number;
  height: number;
  structure: string; // JSON string
}

export interface BannerElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'background';
  content: string;
  properties: BannerElementProperties;
}

export interface BannerElementProperties {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  opacity?: number;
  zIndex?: number;
  [key: string]: any; // その他のプロパティ
}

export interface BannerProjectData {
  id?: string;
  name: string;
  blogPostId?: string;
  templateId: string;
  customizations?: string; // JSON string
  elements?: BannerElement[];
  createdAt?: Date;
  updatedAt?: Date;
}

// src/types/platform.ts
export type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';

export interface PlatformSizes {
  [key: string]: {
    width: number;
    height: number;
    description: string;
  }
}

export const PLATFORM_SIZES: PlatformSizes = {
  'twitter-post': { width: 1200, height: 675, description: 'Twitter投稿画像' },
  'twitter-header': { width: 1500, height: 500, description: 'Twitterヘッダー' },
  'facebook-post': { width: 1200, height: 630, description: 'Facebook投稿画像' },
  'facebook-cover': { width: 1640, height: 624, description: 'Facebookカバー' },
  'instagram-post': { width: 1080, height: 1080, description: 'Instagram投稿画像' },
  'linkedin-post': { width: 1200, height: 627, description: 'LinkedIn投稿画像' },
};