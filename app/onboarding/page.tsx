"use client";

import { useOnboarding } from "@/hooks/onboarding/useOnboarding";
import { OnbordingFormFieldType } from "../../types/onboarding.types";
import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import OnboardingForm from "@/components/Onboarding/OnboardingForm";

const formFields: OnbordingFormFieldType[] = [
  {
    name: "companyName",
    label: "Nombre de la Compañía",
    placeholder: "Ej. Mi Compañía",
  },
  { name: "category", label: "Categoría", placeholder: "Ej. Tecnología" },
  { name: "address", label: "Dirección", placeholder: "Ej. Desarrollo Web" },
];

export default function OnboardingComponent() {
  const { error, loading, form, onSubmit } = useOnboarding();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white p-8">
      <OnboardingHeader />
      <OnboardingForm
        form={form}
        fields={formFields}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
