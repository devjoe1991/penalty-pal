import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car } from "lucide-react";
import AddVehicleForm from "@/components/dashboard/AddVehicleForm";

export default async function MyVehiclesPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Safeguard, should be handled by layout/middleware
    return null;
  }

  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("id, registration_plate, created_at")
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Vehicles</h1>
          <p className="text-muted-foreground">
            Manage the vehicles you want to track for appeals.
          </p>
        </div>
        <AddVehicleForm />
      </div>

      <div>
        {vehicles && vehicles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-6 w-6" />
                    <span>{vehicle.registration_plate}</span>
                  </CardTitle>
                  <CardDescription>
                    Added on: {new Date(vehicle.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                {/* Future actions like 'Delete' can go in CardFooter */}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">No Vehicles Added Yet</h3>
            <p className="text-muted-foreground mt-2">
              Click the button above to add your first vehicle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 