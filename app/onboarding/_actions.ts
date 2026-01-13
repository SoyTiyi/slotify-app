'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'
import { formSchema } from './page'

export const completeOnboarding = async (formData: z.infer<typeof formSchema>) => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        companyName: formData.companyName,
        category: formData.category,
        direction: formData.direction,
      },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}