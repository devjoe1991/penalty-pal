'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateFineStatus(fineId: number, newStatus: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate the new status to ensure it's one of the expected values
  const validStatuses = ['Appeal Generated', 'Submitted', 'Won', 'Lost', 'Awaiting Response'];
  if (!validStatuses.includes(newStatus)) {
    return { success: false, error: "Invalid status provided." };
  }

  const { error } = await supabase
    .from('fines')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', fineId)
    .eq('user_id', user.id); // Ensure user can only update their own fines

  if (error) {
    return { success: false, error: "Database error: Could not update status." };
  }

  // Revalidate both the dashboard and any specific fines pages
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/fines'); // Assuming a future fines detail page
  return { success: true };
} 