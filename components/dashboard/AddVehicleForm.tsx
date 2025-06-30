'use client'

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { addVehicle } from "@/app/dashboard/vehicles/actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner" // We'll add this library next

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add Vehicle"}
    </Button>
  );
}

export default function AddVehicleForm() {
  const [open, setOpen] = useState(false);

  const handleFormAction = async (formData: FormData) => {
    const result = await addVehicle(formData);
    if (result.success) {
      toast.success("Vehicle added successfully!");
      setOpen(false);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Enter the registration plate for the vehicle you want to track.
          </DialogDescription>
        </DialogHeader>
        <form action={handleFormAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registration_plate" className="text-right">
                Plate
              </Label>
              <Input
                id="registration_plate"
                name="registration_plate"
                className="col-span-3"
                placeholder="e.g., AB12 CDE"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 