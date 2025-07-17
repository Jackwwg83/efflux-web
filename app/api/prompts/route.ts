import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const includePublic = searchParams.get('includePublic') === 'true';
    
    let query = supabase
      .from('prompt_templates')
      .select('*');
    
    if (includePublic) {
      // Include user's own templates and public templates
      query = query.or(`user_id.eq.${user.id},is_public.eq.true`);
    } else {
      // Only user's own templates
      query = query.eq('user_id', user.id);
    }
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,content.ilike.%${search}%`);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching prompt templates:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
      .insert({
        user_id: user.id,
        name: name.trim(),
        description: description?.trim() || null,
        content: content.trim(),
        category: category || 'general',
        variables: variables || [],
        is_public: is_public || false,
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating prompt template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}