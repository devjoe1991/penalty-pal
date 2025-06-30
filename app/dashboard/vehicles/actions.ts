 // /app/dashboard/vehicles/actions.ts
'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define the schema for validation
const vehicleSchema = z.object({
  registration_plate: z.string().min(2, "Plate must be at least 2 characters").max(8, "Plate cannot be more than 8 characters"),
});

export async function addVehicle(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const validatedFields = vehicleSchema.safeParse({
    registration_plate: formData.get('registration_plate'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid registration plate.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Sanitize input: Convert to uppercase and remove excess spaces
  const plate = validatedFields.data.registration_plate.toUpperCase().trim();

  const { error } = await supabase
    .from('vehicles')
    .insert({ registration_plate: plate, user_id: user.id });

  if (error) {
    // Handle potential unique constraint violation
    if (error.code === '23505') {
      return { success: false, error: "You have already added this vehicle." };
    }
    return { success: false, error: "Database error: Could not add vehicle." };
  }

  // Revalidate the path to show the new vehicle immediately
  revalidatePath('/dashboard/vehicles');
  return { success: true };
}