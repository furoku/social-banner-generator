// src/types/blog.ts
export interface BlogPostExtract {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  originalContent: string;
}

export interface BlogPostData {
  id?: string;
  content: string;
  title?: string;
  subtitle?: string;
  description?: string;
  cta?: string;
  createdAt?: Date;
  updatedAt?: Date;
}