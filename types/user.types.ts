export type MeResponse = {
  clerkId: string;
  email: string;
  onboardingComplete: boolean;
  companyName?: string | null;
  category?: string | null;
  address?: string | null;
};

export type OnboardingPayload = {
  companyName: string;
  category: string;
  address: string;
};