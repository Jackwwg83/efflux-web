import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('prompt_templates')
      .select('*')
      .eq('id', params.id)
      .or(`user_id.eq.${user.id},is_public.eq.true`)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }
      console.error('Error fetching prompt template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { name, description, content, category, variables, is_public } = body;
    
    // 数据验证
    if (!name || !content) {
      return NextResponse.json({ 
        error: 'Name and content are required' 
      }, { status: 400 });
    }
    
    if (name.length > 100) {
      return NextResponse.json({ 
        error: 'Name must be less than 100 characters' 
      }, { status: 400 });
    }
    
    if (content.length > 10000) {
      return NextResponse.json({ 
        error: 'Content must be less than 10000 characters' 
      }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('prompt_templates')
      .update({
        name: name.trim(),
        description: description?.trim() || null,
        content: content.trim(),
        category: category || 'general',
        variables: variables || [],
        is_public: is_public || false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .eq('user_id', user.id) // 确保用户只能编辑自己的模板
      .select()
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Template not found or access denied' }, { status: 404 });
      }
      console.error('Error updating prompt template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { error } = await supabase
      .from('prompt_templates')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id); // 确保用户只能删除自己的模板
      
    if (error) {
      console.error('Error deleting prompt template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}