import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { isValidApiKeyFormat } from '@/lib/api-key';
import type { ApiKeyValidateRequest, ApiKeyValidateResponse } from '@/lib/types';

// Lazy init to avoid build-time errors
let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return supabaseAdmin;
}

// POST /api/keys/validate - Validate an API key (for relay server)
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApiKeyValidateRequest;
    const { api_key } = body;

    if (!api_key) {
      return NextResponse.json(
        { valid: false, error: 'API key is required' } as ApiKeyValidateResponse,
        { status: 400 }
      );
    }

    if (!isValidApiKeyFormat(api_key)) {
      return NextResponse.json(
        { valid: false, error: 'Invalid API key format' } as ApiKeyValidateResponse,
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Look up the API key
    const { data: keyData, error: fetchError } = await supabase
      .from('api_keys')
      .select('id, monthly_quota, used_this_month')
      .eq('key', api_key)
      .single();

    if (fetchError || !keyData) {
      return NextResponse.json(
        { valid: false, error: 'API key not found' } as ApiKeyValidateResponse,
        { status: 404 }
      );
    }

    const quotaRemaining = keyData.monthly_quota - keyData.used_this_month;

    if (quotaRemaining <= 0) {
      return NextResponse.json(
        { valid: false, error: 'Monthly quota exceeded', quota_remaining: 0 } as ApiKeyValidateResponse,
        { status: 429 }
      );
    }

    // Update usage count and last_used_at
    await supabase
      .from('api_keys')
      .update({
        used_this_month: keyData.used_this_month + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', keyData.id);

    return NextResponse.json({
      valid: true,
      quota_remaining: quotaRemaining - 1,
    } as ApiKeyValidateResponse);
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' } as ApiKeyValidateResponse,
      { status: 500 }
    );
  }
}
