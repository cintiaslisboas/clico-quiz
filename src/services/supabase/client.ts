import { createClient } from '@supabase/supabase-js';

// Fallback para não quebrar a aplicação inteira caso as variáveis de ambiente não estejam configuradas corretamente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.startsWith('http') 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://placeholder.supabase.co';
  
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
