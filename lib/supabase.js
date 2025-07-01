import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hskzpvrectugvmuqvxfz.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhza3pwdnJlY3R1Z3ZtdXF2eGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjM5MTAsImV4cCI6MjA2NTkzOTkxMH0.BK9WTWE4Ww9UPQW5yhAXxvrPRwBfhS_CBYVMkocjOVU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
