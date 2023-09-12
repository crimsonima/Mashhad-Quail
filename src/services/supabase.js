import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://acffttidxbtonwprxvzf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZmZ0dGlkeGJ0b253cHJ4dnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MDY4NDAsImV4cCI6MjAwNjE4Mjg0MH0.J_bHYV0vAbMmucRmZsDfmJI8XVH_XH2CTE-ZYkSjJfQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
