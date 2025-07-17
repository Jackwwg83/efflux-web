'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { PromptTemplateCard } from '@/components/prompts/PromptTemplateCard';
import { PromptTemplateDialog } from '@/components/prompts/PromptTemplateDialog';
import { PromptTemplate } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = [
  { value: 'all', label: '全部分类' },
  { value: 'general', label: '通用' },
  { value: 'coding', label: '编程' },
  { value: 'writing', label: '写作' },
  { value: 'analysis', label: '分析' },
  { value: 'creative', label: '创意' },
  { value: 'business', label: '商务' },
  { value: 'research', label: '研究' },
];

export default function PromptsPage() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [includePublic, setIncludePublic] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, [searchTerm, selectedCategory, includePublic]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (includePublic) params.append('includePublic', 'true');
      
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

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个模板吗？此操作无法撤销。')) return;
    
    try {
      const response = await fetch(`/api/prompts/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTemplates(templates.filter(t => t.id !== id));
        toast({
          title: '删除成功',
          description: '模板已删除',
        });
      } else {
        throw new Error('Failed to delete template');
      }
    } catch (error) {
      console.error('Failed to delete template:', error);
      toast({
        title: '删除失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    }
  };

  const handleUse = async (template: PromptTemplate) => {
    // 增加使用次数
    try {
      await fetch(`/api/prompts/${template.id}/use`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to update usage count:', error);
    }
    
    // TODO: 这里后续会集成到聊天界面
    toast({
      title: '模板已选择',
      description: '即将跳转到聊天界面...',
    });
  };

  const handleSave = (template: PromptTemplate) => {
    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === template.id ? template : t));
      toast({
        title: '更新成功',
        description: '模板已更新',
      });
    } else {
      setTemplates([template, ...templates]);
      toast({
        title: '创建成功',
        description: '模板已创建',
      });
    }
    setShowCreateDialog(false);
    setEditingTemplate(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">提示词模板</h1>
          <p className="text-gray-600 mt-1">创建和管理你的提示词模板，提升工作效率</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          创建模板
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索模板名称、描述或内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          
          <Button
            variant={includePublic ? "default" : "outline"}
            onClick={() => setIncludePublic(!includePublic)}
            className="whitespace-nowrap"
          >
            <Filter className="h-4 w-4 mr-2" />
            {includePublic ? '包含公开' : '仅我的'}
          </Button>
        </div>
      </div>

      {/* 统计信息 */}
      {!loading && (
        <div className="mb-6 text-sm text-gray-600">
          找到 {templates.length} 个模板
        </div>
      )}

      {/* 模板列表 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4" />
            {searchTerm || selectedCategory !== 'all' 
              ? '没有找到匹配的模板' 
              : '还没有任何模板'
            }
          </div>
          {!searchTerm && selectedCategory === 'all' && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              创建第一个模板
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <PromptTemplateCard
              key={template.id}
              template={template}
              onEdit={setEditingTemplate}
              onDelete={handleDelete}
              onUse={handleUse}
            />
          ))}
        </div>
      )}

      {/* 创建/编辑对话框 */}
      <PromptTemplateDialog
        open={showCreateDialog || !!editingTemplate}
        onOpenChange={(open) => {
          if (!open) {
            setShowCreateDialog(false);
            setEditingTemplate(null);
          }
        }}
        template={editingTemplate}
        onSave={handleSave}
      />
    </div>
  );
}