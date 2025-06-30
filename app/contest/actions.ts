'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface FineDetails {
  vehicleId: number;
  pcnNumber: string;
  issuingAuthority: string;
  contraventionDate: string;
}

export async function saveAppealToDashboard(details: FineDetails, appealText: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase.from('fines').insert({
    user_id: user.id,
    vehicle_id: details.vehicleId,
    pcn_number: details.pcnNumber,
    issuing_authority: details.issuingAuthority,
    contravention_date: details.contraventionDate,
    generated_appeal_text: appealText,
    status: 'Appeal Generated',
  });

  if (error) {
    console.error("Error saving appeal:", error);
    return { success: false, error: "Database error: Could not save appeal." };
  }

  revalidatePath('/dashboard');
  return { success: true };
} 