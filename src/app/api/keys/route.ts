import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateApiKey } from '@/lib/api-key';
import type { ApiKey } from '@/lib/types';

// GET /api/keys - List all API keys for current user
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
    }

    return NextResponse.json({ keys: keys as ApiKey[] });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/keys - Create a new API key
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const name = body.name || 'Default Key';

    // Check if user already has 5 keys (limit)
    const { count, error: countError } = await supabase
      .from('api_keys')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (countError) {
      console.error('Error counting API keys:', countError);
      return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
    }

    if (count && count >= 5) {
      return NextResponse.json(
        { error: 'Maximum of 5 API keys allowed' },
        { status: 400 }
      );
    }

    const apiKey = generateApiKey();

    const { data: newKey, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        key: apiKey,
        name: name,
        monthly_quota: 1000,
        used_this_month: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
    }

    return NextResponse.json({ key: newKey as ApiKey }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
