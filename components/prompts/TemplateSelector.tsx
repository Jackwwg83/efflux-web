'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Template, Search, Clock, Star } from 'lucide-react';
import { PromptTemplate } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

interface TemplateVariable {
  name: string;
  description?: string;
  default?: string;
}

interface Props {
  onSelectTemplate: (template: PromptTemplate, processedContent: string) => void;
  disabled?: boolean;
}

export function TemplateSelector({ onSelectTemplate, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [showVariableDialog, setShowVariableDialog] = useState(false);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchTemplates();
    }
  }, [open, searchTerm]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      params.append('includePublic', 'true'); // 包含公开模板
      
      const response = await fetch(`/api/prompts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      } else {
        throw new Error('Failed to fetch templates');
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      toast({
        title: '获取模板失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = async (template: PromptTemplate) => {
    try {
      // 增加使用次数
      await fetch(`/api/prompts/${template.id}/use`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to update usage count:', error);
    }

    // 检查是否有变量需要替换
    const variables = template.variables || [];
    if (variables.length > 0) {
      setSelectedTemplate(template);
      // 初始化变量值
      const initialValues: Record<string, string> = {};
      variables.forEach(variable => {
        initialValues[variable.name] = variable.default || '';
      });
      setVariableValues(initialValues);
      setShowVariableDialog(true);
    } else {
      // 没有变量，直接使用
      onSelectTemplate(template, template.content);
      setOpen(false);
    }
  };

  const handleVariableSubmit = () => {
    if (!selectedTemplate) return;

    let processedContent = selectedTemplate.content;
    
    // 替换所有变量
    Object.entries(variableValues).forEach(([name, value]) => {
      const regex = new RegExp(`\\{\\{${name}\\}\\}`, 'g');
      processedContent = processedContent.replace(regex, value);
    });

    onSelectTemplate(selectedTemplate, processedContent);
    setOpen(false);
    setShowVariableDialog(false);
    setSelectedTemplate(null);
    setVariableValues({});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string | null) => {
    const colors: Record<string, string> = {
      'general': 'bg-gray-100 text-gray-800',
      'coding': 'bg-blue-100 text-blue-800',
      'writing': 'bg-green-100 text-green-800',
      'analysis': 'bg-purple-100 text-purple-800',
      'creative': 'bg-pink-100 text-pink-800',
      'business': 'bg-orange-100 text-orange-800',
      'research': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category || 'general'] || colors.general;
  };

  if (showVariableDialog && selectedTemplate) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
          <h3 className="font-semibold text-lg mb-4">填写模板变量</h3>
          <p className="text-sm text-gray-600 mb-4">
            模板: {selectedTemplate.name}
          </p>
          
          <div className="space-y-4 mb-6">
            {(selectedTemplate.variables || []).map((variable) => (
              <div key={variable.name} className="space-y-2">
                <label className="text-sm font-medium">
                  {variable.name}
                  {variable.description && (
                    <span className="text-gray-500 font-normal ml-1">
                      - {variable.description}
                    </span>
                  )}
                </label>
                <Input
                  value={variableValues[variable.name] || ''}
                  onChange={(e) => setVariableValues({
                    ...variableValues,
                    [variable.name]: e.target.value
                  })}
                  placeholder={variable.default || `输入 ${variable.name}`}
                />
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowVariableDialog(false);
                setSelectedTemplate(null);
                setVariableValues({});
              }}
            >
              取消
            </Button>
            <Button onClick={handleVariableSubmit}>
              使用模板
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={disabled}
          className="shrink-0"
        >
          <Template className="h-4 w-4 mr-2" />
          模板
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索模板..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              加载中...
            </div>
          ) : templates.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchTerm ? '没有找到匹配的模板' : '还没有任何模板'}
            </div>
          ) : (
            <div className="p-2">
              {templates.map(template => (
                <div
                  key={template.id}
                  className="p-3 rounded-md hover:bg-gray-50 cursor-pointer border mb-2"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm line-clamp-1 flex-1">
                      {template.name}
                    </h4>
                    <div className="flex items-center gap-1 ml-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getCategoryColor(template.category)}`}
                      >
                        {template.category || 'general'}
                      </Badge>
                    </div>
                  </div>
                  
                  {template.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {template.description}
                    </p>
                  )}
                  
                  <div className="text-xs text-gray-700 line-clamp-2 mb-2">
                    {template.content}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      {template.variables && template.variables.length > 0 && (
                        <span>{template.variables.length} 个变量</span>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(template.created_at)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {template.usage_count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-3 border-t bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            按 Ctrl+T 快速打开模板选择器
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}