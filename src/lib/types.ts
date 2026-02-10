export interface ApiKey {
  id: string;
  user_id: string;
  key: string;
  name: string;
  monthly_quota: number;
  used_this_month: number;
  created_at: string;
  last_used_at: string | null;
}

export interface ConnectionCode {
  id: string;
  api_key_id: string;
  code: string;
  status: 'pending' | 'connected' | 'expired';
  created_at: string;
  expires_at: string;
}

export interface Profile {
  id: string;
  email: string;
  created_at: string;
}

export interface ApiKeyValidateRequest {
  api_key: string;
}

export interface ApiKeyValidateResponse {
  valid: boolean;
  quota_remaining?: number;
  error?: string;
}
