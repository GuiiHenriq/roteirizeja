import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://vqvgiuabjfozqbgpnlwh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdmdpdWFiamZvenFiZ3BubHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MzUwODMsImV4cCI6MjA0NzExMTA4M30.da6ggSqFgyCcIfPI10iM4oDdr0WKlTVVSv9a8PftOaA";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);