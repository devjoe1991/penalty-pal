'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { saveAppealToDashboard } from "@/app/contest/actions";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Save } from "lucide-react";

type Vehicle = { id: number; registration_plate: string };

const formSchema = z.object({
  vehicleId: z.string().min(1, "Please select a vehicle."),
  pcnNumber: z.string().min(1, "PCN Number is required."),
  issuingAuthority: z.string().min(1, "Issuing Authority is required."),
  contraventionDate: z.string().min(1, "Date is required."),
  userStory: z.string().min(50, "Please provide at least 50 characters about your story."),
});

export default function ChatInterface({ vehicles }: { vehicles: Vehicle[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [appealText, setAppealText] = useState("");
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema> | null>(null);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleId: "",
      pcnNumber: "",
      issuingAuthority: "",
      contraventionDate: "",
      userStory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAppealText("");
    setFormValues(values); // Save form values for the save action

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/appeal-generation-flow`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            pcnDetails: {
              vehicleReg: vehicles.find(v => v.id === parseInt(values.vehicleId))?.registration_plate,
              pcnNumber: values.pcnNumber,
              issuingAuthority: values.issuingAuthority,
              contraventionDate: values.contraventionDate,
              contraventionReason: "User will provide details in their story." // Placeholder
            },
            userStory: values.userStory,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate appeal.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to read response stream.");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.substring(6));
              setAppealText(prev => prev + (json.choices[0]?.delta?.content || ""));
            } catch (e) {
              // Ignore parsing errors for incomplete JSON
            }
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(appealText);
    toast.success("Appeal text copied to clipboard!");
  };

  const handleSave = async () => {
    if (!formValues || !appealText) return;
    const result = await saveAppealToDashboard({
        vehicleId: parseInt(formValues.vehicleId),
        pcnNumber: formValues.pcnNumber,
        issuingAuthority: formValues.issuingAuthority,
        contraventionDate: formValues.contraventionDate,
    }, appealText);

    if (result.success) {
        toast.success("Appeal saved to your dashboard!");
    } else {
        toast.error(result.error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Contest Your Fine</CardTitle>
          <CardDescription>Fill out the details below to generate your appeal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Form fields go here */}
              <FormField control={form.control} name="vehicleId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a vehicle" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {vehicles.map(v => <SelectItem key={v.id} value={String(v.id)}>{v.registration_plate}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="pcnNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>PCN Number</FormLabel>
                  <FormControl><Input placeholder="e.g., AB12345678" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="issuingAuthority" render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuing Authority</FormLabel>
                  <FormControl><Input placeholder="e.g., Transport for London" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="contraventionDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Contravention</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="userStory" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Story</FormLabel>
                  <FormControl><Textarea placeholder="Explain what happened in as much detail as possible..." {...field} rows={6} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Generating Appeal..." : "Generate My Appeal"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Generated Appeal</CardTitle>
          <CardDescription>Review the AI-generated text. You can copy it or save it to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          {appealText && (
            <div className="space-y-4">
               <div className="p-4 border rounded-md bg-muted h-96 overflow-y-auto whitespace-pre-wrap">
                  {appealText}
               </div>
               <div className="flex gap-2">
                  <Button onClick={handleCopyToClipboard} variant="outline" className="w-full"><Copy className="mr-2 h-4 w-4" /> Copy Text</Button>
                  <Button onClick={handleSave} className="w-full"><Save className="mr-2 h-4 w-4" /> Save to Dashboard</Button>
               </div>
            </div>
          )}
           {(isLoading && !appealText) && <p className="text-muted-foreground text-center">Generating, please wait...</p>}
           {(!isLoading && !appealText) && <p className="text-muted-foreground text-center">Your appeal will appear here once generated.</p>}
        </CardContent>
      </Card>
    </div>
  );
} 