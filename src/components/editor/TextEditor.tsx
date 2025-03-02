// src/components/editor/TextEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type BannerElement } from "@/types/banner";

interface TextEditorProps {
  selectedElement: BannerElement | null;
  onUpdate: (updates: Partial<BannerElement>) => void;
}

export function TextEditor({ selectedElement, onUpdate }: TextEditorProps) {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontWeight, setFontWeight] = useState("normal");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  // 選択された要素が変更されたら状態を更新
  useEffect(() => {
    if (selectedElement && selectedElement.type === "text") {
      setText(selectedElement.content || "");
      setFontSize(selectedElement.properties.fontSize || 16);
      setFontFamily(selectedElement.properties.fontFamily || "sans-serif");
      setFontWeight(selectedElement.properties.fontWeight || "normal");
      setColor(selectedElement.properties.color || "#000000");
      setBackgroundColor(selectedElement.properties.backgroundColor || "transparent");
    }
  }, [selectedElement]);

  // 要素が選択されていない場合
  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        要素を選択するか、新しいテキスト要素を追加してください
      </div>
    );
  }

  // テキスト要素以外が選択されている場合
  if (selectedElement.type !== "text") {
    return (
      <div className="p-4 text-center text-muted-foreground">
        テキスト編集はテキスト要素のみ可能です
      </div>
    );
  }

  // テキスト内容の更新
  const handleTextChange = (value: string) => {
    setText(value);
    onUpdate({ content: value });
  };

  // フォントサイズの更新
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    onUpdate({
      properties: {
        ...selectedElement.properties,
        fontSize: newSize,
      },
    });
  };

  // フォントファミリーの更新
  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    onUpdate({
      properties: {
        ...selectedElement.properties,
        fontFamily: value,
      },
    });
  };

  // フォントウェイトの更新
  const handleFontWeightChange = (value: string) => {
    setFontWeight(value);
    onUpdate({
      properties: {
        ...selectedElement.properties,
        fontWeight: value,
      },
    });
  };

  // テキスト色の更新
  const handleColorChange = (value: string) => {
    setColor(value);
    onUpdate({
      properties: {
        ...selectedElement.properties,
        color: value,
      },
    });
  };

  // 背景色の更新
  const handleBackgroundColorChange = (value: string) => {
    setBackgroundColor(value);
    onUpdate({
      properties: {
        ...selectedElement.properties,
        backgroundColor: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text-content">テキスト内容</Label>
        <Textarea
          id="text-content"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-size">フォントサイズ: {fontSize}px</Label>
        <Slider
          id="font-size"
          min={8}
          max={72}
          step={1}
          value={[fontSize]}
          onValueChange={handleFontSizeChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-family">フォント</Label>
        <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
          <SelectTrigger id="font-family">
            <SelectValue placeholder="フォントを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans-serif">Sans-serif</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="monospace">Monospace</SelectItem>
            <SelectItem value="cursive">Cursive</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="system-ui">System UI</SelectItem>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Verdana">Verdana</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-weight">ウェイト</Label>
        <Select value={fontWeight} onValueChange={handleFontWeightChange}>
          <SelectTrigger id="font-weight">
            <SelectValue placeholder="ウェイトを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
            <SelectItem value="lighter">Lighter</SelectItem>
            <SelectItem value="bolder">Bolder</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="200">200</SelectItem>
            <SelectItem value="300">300</SelectItem>
            <SelectItem value="400">400</SelectItem>
            <SelectItem value="500">500</SelectItem>
            <SelectItem value="600">600</SelectItem>
            <SelectItem value="700">700</SelectItem>
            <SelectItem value="800">800</SelectItem>
            <SelectItem value="900">900</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="text-color">テキスト色</Label>
          <div className="flex gap-2">
            <Input
              id="text-color"
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-12 h-8 p-0"
            />
            <Input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="background-color">背景色</Label>
          <div className="flex gap-2">
            <Input
              id="background-color"
              type="color"
              value={backgroundColor === "transparent" ? "#ffffff" : backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              className="w-12 h-8 p-0"
            />
            <Input
              type="text"
              value={backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}