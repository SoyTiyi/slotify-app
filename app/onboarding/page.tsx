"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const formSchema = z.object({
  companyName: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  direction: z.string().min(2).max(100),
});

export default function OnboardingComponent() {
  const [error, setError] = React.useState("");
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      category: "",
      direction: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await completeOnboarding(data);
    if (res?.message) {
      await user?.reload();
      router.push("/dashboard");
    }
    if (res?.error) {
      setError(res?.error);
    }
    console.log(data);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white p-8">
      <h1 className="text-5xl font-semibold mb-8">
        Bienvenido a <b className="text-6xl font-bold text-primary">Slotify</b>
      </h1>
      <p className="text-2xl text-muted font-medium mb-24 text-lg">
        Para comenzar, por favor completa la siguiente información sobre tu
        aplicación.
      </p>
      <div className="w-full max-w-md bg-surface p-8 rounded-lg shadow-lg font-semibold gap-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="companyName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Compañía</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Mi Compañía" {...field} className="text-white"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Tecnología" {...field} className="text-white"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="direction"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Desarrollo Web" {...field} className="text-white"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
