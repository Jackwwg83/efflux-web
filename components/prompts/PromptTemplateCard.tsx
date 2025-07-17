import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Play, Eye, Copy, User, Globe } from 'lucide-react';
import { PromptTemplate } from '@/types/database';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  template: PromptTemplate;
  onEdit: (template: PromptTemplate) => void;
  onDelete: (id: string) => void;
  onUse: (template: PromptTemplate) => void;
}

export function PromptTemplateCard({ template, onEdit, onDelete, onUse }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const truncatedContent = template.content.length > 150 
    ? template.content.substring(0, 150) + '...'
    : template.content;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(template.content);
      toast({
        title: '复制成功',
        description: '模板内容已复制到剪贴板',
      });
    } catch (error) {
      toast({
        title: '复制失败',
        description: '请手动复制内容',
        variant: 'destructive',
      });
    }
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

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">
            {template.name}
          </CardTitle>
          <div className="flex items-center gap-1 flex-shrink-0">
            {template.is_public ? (
              <Globe className="h-4 w-4 text-blue-500" title="公开模板" />
            ) : (
              <User className="h-4 w-4 text-gray-500" title="私有模板" />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            className={`text-xs ${getCategoryColor(template.category)}`}
          >
            {template.category || 'general'}
          </Badge>
          <div className="text-xs text-gray-500">
            使用 {template.usage_count} 次
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        {template.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {template.description}
          </p>
        )}
        
        <div 
          className="text-sm text-gray-700 mb-3 cursor-pointer hover:text-gray-900 transition-colors"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? template.content : truncatedContent}
        </div>
        
        {template.variables && template.variables.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-xs text-gray-500 mr-1">变量:</span>
            {template.variables.map((variable, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {variable.name}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="text-xs text-gray-400">
          创建于 {formatDate(template.created_at)}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPreview(!showPreview)}
            title="预览"
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
            title="复制内容"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(template)}
            title="编辑"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(template.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            title="删除"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          size="sm" 
          onClick={() => onUse(template)}
          className="bg-primary hover:bg-primary/90"
        >
          <Play className="h-3 w-3 mr-1" />
          使用
        </Button>
      </CardFooter>
    </Card>
  );
}