-- Strengthen RLS policies for contacts table
-- Add explicit DENY policies for UPDATE and DELETE operations
CREATE POLICY "Deny all updates to contacts" 
ON public.contacts 
FOR UPDATE 
USING (false);

CREATE POLICY "Deny all deletes to contacts" 
ON public.contacts 
FOR DELETE 
USING (false);

-- Create rate limiting table
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_rate_limits_lookup ON public.rate_limits(ip_address, endpoint, window_start);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can access rate_limits table
CREATE POLICY "Service role only for rate_limits" 
ON public.rate_limits 
FOR ALL 
USING (auth.role() = 'service_role');

-- Function to clean up old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to periodically clean up old entries
-- Note: In production, you might want to use pg_cron for scheduled cleanup instead