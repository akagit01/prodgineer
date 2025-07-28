import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface AITool {
  id: string;
  name: string;
  logo_url: string | null;
  description: string;
  use_case: string;
  phase: 'discovery' | 'delivery' | 'iteration';
  link: string;
  context_window: string | null;
  free_limit: string | null;
  created_at: string;
  average_rating?: number;
}

export interface Rating {
  id: string;
  tool_id: string;
  rating: number;
  user_id: string;
  created_at: string;
}