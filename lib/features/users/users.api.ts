import { MeResponse, OnboardingPayload } from '../../../types/user.types';

export function usersApiServer(apiServer: <T>(endpoint: string, options?: any) => Promise<T>) {
  return {
    me: () => apiServer<MeResponse>('/users/me'),
    completeOnboarding: (payload: OnboardingPayload) =>
      apiServer<MeResponse>('/users/onboarding', {
        method: 'POST',
        body: payload,
      }),
  };
}

export function usersApiClient(apiClient: <T>(endpoint: string, token: string | null, options?: any) => Promise<T>) {
  return {
    me: (token: string | null) => apiClient<MeResponse>('/users/me', token),
    completeOnboarding: (token: string | null, payload: OnboardingPayload) =>
      apiClient<MeResponse>('/users/onboarding', token, {
        method: 'POST',
        body: payload,
      }),
  };
}
