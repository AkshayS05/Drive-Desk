import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ivvbiugnjmmvrjumnmft.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dmJpdWduam1tdnJqdW1ubWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NjMzNzEsImV4cCI6MjA1OTMzOTM3MX0.NL6peKD-ODS0igksT3itjoAABGSHLhw-_SxZtUjb4lM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
