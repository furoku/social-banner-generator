// src/components/templates/TemplateGrid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BannerTemplateData } from "@/types/banner";
import { type BlogPostExtract } from "@/types/blog";

interface TemplateGridProps {
  templates: BannerTemplateData[];
  extractedText: BlogPostExtract;
}

export function TemplateGrid({ templates, extractedText }: TemplateGridProps) {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateProject = async () => {
    if (!selectedTemplate) return;
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${extractedText.title.slice(0, 30)}... プロジェクト`,
          templateId: selectedTemplate,
          blogPost: {
            content: extractedText.originalContent,
            title: extractedText.title,
            subtitle: extractedText.subtitle,
            description: extractedText.description,
            cta: extractedText.cta
          }
        }),
      });

      if (!response.ok) {
        throw new Error('プロジェクト作成に失敗しました');
      }

      const data = await response.json();
      router.push(`/projects/${data.id}/edit`);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">テンプレートを選択</h2>
        <p className="text-muted-foreground">
          バナーデザインのベースとなるテンプレートを選択してください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary ring-offset-2' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-md">{template.name}</CardTitle>
              {template.description && (
                <CardDescription>{template.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="aspect-video relative">
              {template.thumbnail ? (
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover rounded-md"
                />
              ) : (
                <div 
                  className="w-full h-full bg-muted flex items-center justify-center rounded-md"
                >
                  <p className="text-muted-foreground">プレビュー画像なし</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                {template.width} x {template.height}px
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleCreateProject}
          disabled={!selectedTemplate}
        >
          このテンプレートで作成
        </Button>
      </div>
    </div>
  );
}