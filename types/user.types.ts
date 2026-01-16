export type MeResponse = {
  clerkId: string;
  email: string;
  onboardingComplete: boolean;
  companyName?: string | null;
  category?: string | null;
  direction?: string | null;
};

export type OnboardingPayload = {
  companyName: string;
  category: string;
  direction: string;
};