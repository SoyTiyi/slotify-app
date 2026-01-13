import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeOnboarding } from "@/app/onboarding/_actions";

export const formSchema = z.object({
  companyName: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  direction: z.string().min(2).max(100),
});

export function useOnboarding() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setError("");

    try {
      const res = await completeOnboarding(data);

      if (res?.message) {
        await user?.reload();
        router.push("/dashboard");
      }

      if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return { error, loading, form, onSubmit };
}