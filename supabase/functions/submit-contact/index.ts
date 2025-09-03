import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_REQUEST_SIZE = 10 * 1024; // 10KB
const RATE_LIMIT_WINDOW_HOURS = 1;
const RATE_LIMIT_MAX_REQUESTS = 5;

// HTML sanitization function
function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Get client IP address
function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfIp = req.headers.get('cf-connecting-ip');
  
  return cfIp || realIp || forwarded?.split(',')[0] || 'unknown';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Check request size
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      console.warn('Request too large:', contentLength);
      throw new Error('Request too large');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get client IP for rate limiting
    const clientIp = getClientIp(req);
    const endpoint = 'submit-contact';
    
    // Clean up old rate limit entries
    await supabase.rpc('cleanup_old_rate_limits');
    
    // Check rate limit
    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - RATE_LIMIT_WINDOW_HOURS);
    
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('rate_limits')
      .select('request_count')
      .eq('ip_address', clientIp)
      .eq('endpoint', endpoint)
      .gte('window_start', windowStart.toISOString())
      .single();
    
    if (rateLimitData && rateLimitData.request_count >= RATE_LIMIT_MAX_REQUESTS) {
      console.warn('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Update or create rate limit entry
    if (rateLimitData) {
      await supabase
        .from('rate_limits')
        .update({ 
          request_count: rateLimitData.request_count + 1,
          updated_at: new Date().toISOString()
        })
        .eq('ip_address', clientIp)
        .eq('endpoint', endpoint)
        .gte('window_start', windowStart.toISOString());
    } else {
      await supabase
        .from('rate_limits')
        .insert({
          ip_address: clientIp,
          endpoint,
          request_count: 1,
          window_start: new Date().toISOString()
        });
    }
    
    // Parse and validate request body
    const { name, email, subject, message }: ContactRequest = await req.json();
    
    console.log('Processing contact form submission from IP:', clientIp);
    
    // Validate required fields
    if (!name || !email || !message) {
      throw new Error('Missing required fields');
    }
    
    // Validate field lengths
    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(`Name must be less than ${MAX_NAME_LENGTH} characters`);
    }
    
    if (subject && subject.length > MAX_SUBJECT_LENGTH) {
      throw new Error(`Subject must be less than ${MAX_SUBJECT_LENGTH} characters`);
    }
    
    if (message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message must be less than ${MAX_MESSAGE_LENGTH} characters`);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
    
    // Sanitize inputs
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSubject = subject ? sanitizeHtml(subject.trim()) : null;
    const sanitizedMessage = sanitizeHtml(message.trim());
    
    // Insert contact into database
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Database error:', error);
      throw new Error('Unable to save contact information');
    }
    
    console.log('Contact saved successfully:', data.id, 'from IP:', clientIp);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!',
        id: data.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in submit-contact function:', error.message);
    
    // Determine appropriate error message and status
    let userMessage = 'An error occurred while submitting the form';
    let statusCode = 500;
    
    if (error.message === 'Missing required fields' || 
        error.message === 'Invalid email address' ||
        error.message.includes('must be less than') ||
        error.message === 'Request too large') {
      userMessage = error.message;
      statusCode = 400;
    } else if (error.message === 'Too many requests. Please try again later.') {
      userMessage = error.message;
      statusCode = 429;
    }
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: userMessage 
      }),
      {
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});