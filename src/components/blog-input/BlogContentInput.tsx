// src/components/blog-input/BlogContentInput.tsx
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { extractTextFromBlogContent } from "@/lib/utils/text-extractor";
import { type BlogPostExtract } from "@/types/blog";
import { TextExtractionResult } from "./TextExtractionResult";

interface BlogContentInputProps {
  onExtracted: (extractedData: BlogPostExtract) => void;
}

export function BlogContentInput({ onExtracted }: BlogContentInputProps) {
  const [content, setContent] = useState<string>("");
  const [extractedData, setExtractedData] = useState<BlogPostExtract | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleExtractText = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    
    try {
      // クライアントサイドで抽出
      const extracted = extractTextFromBlogContent(content);
      setExtractedData(extracted);
      onExtracted(extracted);
      
      // または、APIを使用して抽出する場合
      /*
      const response = await fetch('/api/extract-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('テキスト抽出に失敗しました');
      }

      const extracted = await response.json();
      setExtractedData(extracted);
      onExtracted(extracted);
      */
    } catch (error) {
      console.error('Error extracting text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ブログ記事の内容を入力</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="ブログ記事の内容をここに貼り付けてください..."
            className="min-h-[300px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleExtractText}
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? "抽出中..." : "テキストを抽出"}
          </Button>
        </CardFooter>
      </Card>

      {extractedData && (
        <TextExtractionResult 
          extractedData={extractedData}
          onUpdate={(updated) => {
            setExtractedData(updated);
            onExtracted(updated);
          }}
        />
      )}
    </div>
  );
}