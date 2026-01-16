import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OnboardingProps } from "../../types/onboarding.types";


const OnboardingForm = ({ form, fields, onSubmit, loading, error }: OnboardingProps) => {
  return (
    <div className="w-full max-w-md bg-surface p-8 rounded-lg shadow-lg font-semibold gap-6">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map(({ name, label, placeholder }) => (
            <FormField
              key={name}
              name={name}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">
                    {label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-lg p-6 rounded-md hover:bg-primary-hover cursor-pointer"
          >
            {loading ? "Cargando..." : "Enviar"}
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </FormProvider>
    </div>
  );
};

export default OnboardingForm;
