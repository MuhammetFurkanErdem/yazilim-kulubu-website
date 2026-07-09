import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ffexovxtgyiohpammgop.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZXhvdnh0Z3lpb2hwYW1tZ29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAxOTksImV4cCI6MjA5NDY3NjE5OX0.irV8cQUpEdAaO4mG1a2waI_CBMvXBvuUSOEAHewlFD0'
);

async function run() {
  const { data: projects } = await supabase.from('projects').select('*');
  console.log("PROJECTS:\n", JSON.stringify(projects, null, 2));

  const { data: events } = await supabase.from('events').select('*');
  console.log("EVENTS:\n", JSON.stringify(events, null, 2));
}

run();
