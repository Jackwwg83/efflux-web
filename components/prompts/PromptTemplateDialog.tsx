'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Eye, EyeOff } from 'lucide-react';
import { PromptTemplate } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

interface Variable {
  name: string;
  description?: string;
  default?: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: PromptTemplate | null;
  onSave: (template: PromptTemplate) => void;
}

const CATEGORIES = [
  { value: 'general', label: '通用' },
  { value: 'coding', label: '编程' },
  { value: 'writing', label: '写作' },
  { value: 'analysis', label: '分析' },
  { value: 'creative', label: '创意' },
  { value: 'business', label: '商务' },
  { value: 'research', label: '研究' },
];

export function PromptTemplateDialog({ open, onOpenChange, template, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    category: 'general',
    is_public: false,
  });
  const [variables, setVariables] = useState<Variable[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        description: template.description || '',
        content: template.content,
        category: template.category || 'general',
        is_public: template.is_public,
      });
      setVariables(template.variables || []);
    } else {
      setFormData({
        name: '',
        description: '',
        content: '',
        category: 'general',
        is_public: false,
      });
      setVariables([]);
    }
  }, [template]);

  const extractVariablesFromContent = (content: string): Variable[] => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...content.matchAll(regex)];
    const variableNames = [...new Set(matches.map(match => match[1].trim()))];
    
    return variableNames.map(name => {
      const existing = variables.find(v => v.name === name);
      return existing || { name, description: '', default: '' };
    });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
    
    // 自动提取变量
    const extractedVariables = extractVariablesFromContent(content);
    setVariables(extractedVariables);
  };

  const addVariable = () => {
    setVariables([...variables, { name: '', description: '', default: '' }]);
  };

  const updateVariable = (index: number, field: keyof Variable, value: string) => {
    const updated = [...variables];
    updated[index] = { ...updated[index], [field]: value };
    setVariables(updated);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const renderPreview = () => {
    let preview = formData.content;
    variables.forEach(variable => {
      if (variable.name && variable.default) {
        const regex = new RegExp(`\\{\\{${variable.name}\\}\\}`, 'g');
        preview = preview.replace(regex, `[${variable.default}]`);
      }
    });
    return preview;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: '请填写模板名称',
        variant: 'destructive',
      });
      return false;
    }
    
    if (!formData.content.trim()) {
      toast({
        title: '请填写模板内容',
        variant: 'destructive',
      });
      return false;
    }
    
    // 验证变量名不为空
    for (let i = 0; i < variables.length; i++) {
      if (!variables[i].name.trim()) {
        toast({
          title: `第 ${i + 1} 个变量名称不能为空`,
          variant: 'destructive',
        });
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const url = template ? `/api/prompts/${template.id}` : '/api/prompts';
      const method = template ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          variables: variables.filter(v => v.name.trim()),
        }),
      });
      
      if (response.ok) {
        const savedTemplate = await response.json();
        onSave(savedTemplate);
        toast({
          title: template ? '更新成功' : '创建成功',
          description: template ? '模板已更新' : '模板已创建',
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save template');
      }
    } catch (error) {
      console.error('Failed to save template:', error);
      toast({
        title: '保存失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template ? '编辑模板' : '创建模板'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">模板名称 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="输入模板名称"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">分类</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="简单描述这个模板的用途"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">模板内容 *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {showPreview ? '编辑' : '预览'}
              </Button>
            </div>
            
            {showPreview ? (
              <div className="min-h-[200px] p-3 border rounded-md bg-gray-50 whitespace-pre-wrap">
                {renderPreview() || '请输入模板内容'}
              </div>
            ) : (
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="输入模板内容，使用 {{变量名}} 定义变量"
                className="min-h-[200px] resize-vertical"
                required
              />
            )}
            
            <p className="text-xs text-gray-500">
              使用 <code className="bg-gray-100 px-1 rounded">{'{{变量名}}'}</code> 定义可替换的变量
            </p>
          </div>
          
          {variables.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>变量设置</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVariable}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  添加变量
                </Button>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {variables.map((variable, index) => (
                  <div key={index} className="flex gap-2 items-start p-3 border rounded-md">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="变量名"
                        value={variable.name}
                        onChange={(e) => updateVariable(index, 'name', e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        placeholder="描述（可选）"
                        value={variable.description || ''}
                        onChange={(e) => updateVariable(index, 'description', e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        placeholder="默认值（可选）"
                        value={variable.default || ''}
                        onChange={(e) => updateVariable(index, 'default', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariable(index)}
                      className="text-red-500 hover:text-red-700 mt-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Switch
              id="is_public"
              checked={formData.is_public}
              onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
            />
            <Label htmlFor="is_public">设为公开模板</Label>
            <p className="text-xs text-gray-500 ml-2">
              公开模板可以被其他用户查看和使用
            </p>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '保存中...' : (template ? '更新' : '创建')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}