'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'
import { formSchema } from '@/hooks/onboarding/useOnboarding'
import { apiClient } from '@/lib/api'
import { usersApiClient } from '@/lib/features/users/users.api'

export const completeOnboarding = async (formData: z.infer<typeof formSchema>) => {
  const { getToken, isAuthenticated, userId } = await auth()

  const token = await getToken();

  if (!isAuthenticated || !userId || !token) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()
  const users = usersApiClient(apiClient)

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    })

    await users.completeOnboarding(token, formData)

    return { message: res.publicMetadata }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}