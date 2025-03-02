// src/components/blog-input/TextExtractionResult.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Edit } from "lucide-react";
import { type BlogPostExtract } from "@/types/blog";
import { type SocialPlatform } from "@/types/banner";
import { optimizeForPlatform } from "@/lib/utils/text-extractor";

interface TextExtractionResultProps {
  extractedData: BlogPostExtract;
  onUpdate: (updated: BlogPostExtract) => void;
}

export function TextExtractionResult({
  extractedData,
  onUpdate,
}: TextExtractionResultProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<BlogPostExtract>(extractedData);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedData);
    setIsEditing(false);
  };

  const handleOptimizeForPlatform = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    const optimized = optimizeForPlatform(extractedData, platform);
    setEditedData(optimized);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>抽出されたテキスト</CardTitle>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            編集
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Check className="h-4 w-4 mr-2" />
            保存
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* プラットフォーム最適化ボタン */}
          {isEditing && (
            <div className="space-y-2">
              <Label>プラットフォーム向けに最適化</Label>
              <div className="flex flex-wrap gap-2">
                {(['twitter', 'facebook', 'instagram', 'linkedin'] as SocialPlatform[]).map(
                  (platform) => (
                    <Button
                      key={platform}
                      variant={
                        selectedPlatform === platform ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleOptimizeForPlatform(platform)}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Button>
                  )
                )}
              </div>
            </div>
          )}

          {/* タイトル */}
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            {isEditing ? (
              <Input
                id="title"
                value={editedData.title}
                onChange={(e) =>
                  setEditedData({ ...editedData, title: e.target.value })
                }
              />
            ) : (
              <div className="p-2 bg-muted rounded-md">{extractedData.title}</div>
            )}
          </div>

          {/* サブタイトル */}
          <div className="space-y-2">
            <Label htmlFor="subtitle">サブタイトル</Label>
            {isEditing ? (
              <Input
                id="subtitle"
                value={editedData.subtitle}
                onChange={(e) =>
                  setEditedData({ ...editedData, subtitle: e.target.value })
                }
              />
            ) : (
              <div className="p-2 bg-muted rounded-md">
                {extractedData.subtitle || "（サブタイトルなし）"}
              </div>
            )}
          </div>

          {/* 説明文 */}
          <div className="space-y-2">
            <Label htmlFor="description">説明文</Label>
            {isEditing ? (
              <Textarea
                id="description"
                value={editedData.description}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    description: e.target.value,
                  })
                }
              />
            ) : (
              <div className="p-2 bg-muted rounded-md">
                {extractedData.description || "（説明文なし）"}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="space-y-2">
            <Label htmlFor="cta">CTA（Call to Action）</Label>
            {isEditing ? (
              <Input
                id="cta"
                value={editedData.cta}
                onChange={(e) =>
                  setEditedData({ ...editedData, cta: e.target.value })
                }
              />
            ) : (
              <div className="p-2 bg-muted rounded-md">
                {extractedData.cta || "（CTAなし）"}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}