import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateApiKey } from '@/lib/api-key';

// DELETE /api/keys/[id] - Delete an API key
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the key belongs to the user
    const { data: existingKey, error: fetchError } = await supabase
      .from('api_keys')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 });
    }

    const { error } = await supabase.from('api_keys').delete().eq('id', id);

    if (error) {
      console.error('Error deleting API key:', error);
      return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/keys/[id] - Update or regenerate an API key
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { name, regenerate } = body;

    // Verify the key belongs to the user
    const { data: existingKey, error: fetchError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 });
    }

    const updates: { name?: string; key?: string } = {};

    if (name) {
      updates.name = name;
    }

    if (regenerate) {
      updates.key = generateApiKey();
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    const { data: updatedKey, error } = await supabase
      .from('api_keys')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating API key:', error);
      return NextResponse.json({ error: 'Failed to update API key' }, { status: 500 });
    }

    return NextResponse.json({ key: updatedKey });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
