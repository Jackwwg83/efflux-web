-- Add vault_reset_tokens table to existing Supabase database
-- Execute this in Supabase SQL Editor if the table doesn't exist

-- Vault reset tokens table
CREATE TABLE IF NOT EXISTS vault_reset_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vault_reset_tokens_user_id ON vault_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_vault_reset_tokens_token ON vault_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_vault_reset_tokens_expires ON vault_reset_tokens(expires_at);

-- Enable RLS for security
ALTER TABLE vault_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for vault reset tokens  
CREATE POLICY "Users can manage own vault reset tokens" ON vault_reset_tokens
  FOR ALL USING (auth.uid() = user_id);