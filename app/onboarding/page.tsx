'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  companyName: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  direction: z.string().min(2).max(100),
})

export default function OnboardingComponent() {
  const [error, setError] = React.useState('')
  const { user } = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      category: "",
      direction: "",
    },
  })

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData)
    if (res?.message) {
      await user?.reload()
      router.push('/dashboard')
    }
    if (res?.error) {
      setError(res?.error)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center text-white p-8">
      <h1 className="text-5xl font-semibold mb-8">Bienvenido a <b className="text-6xl font-bold text-primary">Slotify</b></h1>
      <p className="text-2xl text-muted font-medium mb-6 text-lg">Para comenzar, por favor completa la siguiente información sobre tu aplicación.</p>
      <form className="bg-surface border border-muted p-6 rounded-lg shadow-md w-full max-w-md" action={handleSubmit}>
        <div>
          <label>Application Name</label>
          <p>Enter the name of your application.</p>
          <input type="text" name="applicationName" required />
        </div>

        <div>
          <label>Application Type</label>
          <p>Describe the type of your application.</p>
          <input type="text" name="applicationType" required />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}