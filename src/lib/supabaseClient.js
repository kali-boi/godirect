import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcicfnpphfxhqzhzwagh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWNmbnBwaGZ4aHF6aHp3YWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MzgwOTEsImV4cCI6MjEwMzAxNDA5MX0.qiBTu_2RdwCkCL8WkDtSFiED3xNAG9-t4UjHOloDrsc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
