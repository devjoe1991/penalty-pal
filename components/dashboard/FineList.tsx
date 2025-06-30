'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { updateFineStatus } from "@/app/dashboard/actions"

// Define the shape of the fine data we expect
type Fine = {
  id: number;
  pcn_number: string;
  issuing_authority: string;
  status: string;
  contravention_date: string;
}

interface FineListProps {
  fines: Fine[];
}

export default function FineList({ fines }: FineListProps) {
  const handleStatusChange = async (fineId: number, newStatus: string) => {
    const result = await updateFineStatus(fineId, newStatus);
    if (result.success) {
      toast.success("Status updated successfully!");
    } else {
      toast.error(result.error);
    }
  };

  const statuses = ['Submitted', 'Awaiting Response', 'Won', 'Lost'];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>PCN Number</TableHead>
          <TableHead>Authority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fines.map((fine) => (
          <TableRow key={fine.id}>
            <TableCell className="font-medium">{fine.pcn_number}</TableCell>
            <TableCell>{fine.issuing_authority}</TableCell>
            <TableCell>
              <Badge variant="outline">{fine.status}</Badge>
            </TableCell>
            <TableCell>
              {new Date(fine.contravention_date).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {statuses.map((status) => (
                     <DropdownMenuItem
                        key={status}
                        onSelect={() => handleStatusChange(fine.id, status)}
                      >
                       {status}
                     </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 