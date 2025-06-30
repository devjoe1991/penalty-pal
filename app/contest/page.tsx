import { createClient } from "@/lib/supabase/server";
import ChatInterface from "@/components/dashboard/ChatInterface";
import { redirect } from "next/navigation";

export default async function ContestPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('id, registration_plate');

  return (
    <div className="p-4 md:p-8">
      <ChatInterface vehicles={vehicles || []} />
    </div>
  );
} 