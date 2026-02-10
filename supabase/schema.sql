-- Dubai Crab Auth System Schema
-- Run this in Supabase SQL Editor

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- API Keys table
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  key TEXT NOT NULL UNIQUE,
  name TEXT DEFAULT 'Default Key' NOT NULL,
  monthly_quota INTEGER DEFAULT 1000 NOT NULL,
  used_this_month INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_used_at TIMESTAMPTZ
);

-- Connection codes table (for app linking)
CREATE TABLE IF NOT EXISTS public.connection_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key_id UUID REFERENCES public.api_keys(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'connected', 'expired')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_codes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- API Keys policies
CREATE POLICY "Users can view own API keys"
  ON public.api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own API keys"
  ON public.api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys"
  ON public.api_keys FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys"
  ON public.api_keys FOR DELETE
  USING (auth.uid() = user_id);

-- Connection codes policies
CREATE POLICY "Users can view own connection codes"
  ON public.connection_codes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.api_keys
      WHERE api_keys.id = connection_codes.api_key_id
      AND api_keys.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own connection codes"
  ON public.connection_codes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.api_keys
      WHERE api_keys.id = connection_codes.api_key_id
      AND api_keys.user_id = auth.uid()
    )
  );

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to reset monthly usage (run via cron)
CREATE OR REPLACE FUNCTION public.reset_monthly_usage()
RETURNS void AS $$
BEGIN
  UPDATE public.api_keys SET used_this_month = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Index for fast API key lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_key ON public.api_keys(key);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_connection_codes_code ON public.connection_codes(code);
