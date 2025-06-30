import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FineList from "@/components/dashboard/FineList";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This should be handled by layout and middleware, but as a safeguard
    return null;
  }

  // Fetch all data in parallel for efficiency
  const [vehiclesData, activeFinesData, recentFinesData] = await Promise.all([
    // 1. Fetch vehicle count
    supabase.from("vehicles").select("id", { count: "exact", head: true }),
    // 2. Fetch active fines count
    supabase
      .from("fines")
      .select("id", { count: "exact", head: true })
      .not("status", "in", '("Won", "Lost")'),
    // 3. Fetch 5 most recent fines
    supabase
      .from("fines")
      .select("id, pcn_number, issuing_authority, status, contravention_date")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const vehicleCount = vehiclesData.count ?? 0;
  const activeFinesCount = activeFinesData.count ?? 0;
  const recentFines = recentFinesData.data as any[] ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          A summary of your vehicles and appeals.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Vehicles</CardTitle>
            <CardDescription>Vehicles you are tracking.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{vehicleCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Appeals</CardTitle>
            <CardDescription>Fines awaiting a resolution.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{activeFinesCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Fines Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Appeals</h2>
        <Card>
          <CardContent className="pt-6">
            {recentFines.length > 0 ? (
              <FineList fines={recentFines} />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You haven't contested any fines yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/contest">Contest Your First Fine</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 