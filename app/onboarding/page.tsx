"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/hooks/onboarding/useOnboarding";

export default function OnboardingComponent() {
  const { error, loading, form, onSubmit } = useOnboarding();

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
                  <FormLabel className="text-xl font-semibold">Nombre de la Compañía</FormLabel>
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
                  <FormLabel className="text-xl font-semibold">Categoría</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Tecnología" {...field} className="text-white"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Desarrollo Web" {...field} className="text-white"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full text-lg p-6 rounded-md hover:bg-primary-hover cursor-pointer">{loading ? "Cargando..." : "Enviar"}</Button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
