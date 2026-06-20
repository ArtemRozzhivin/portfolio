import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { contactSchema, type ContactValues } from '../schema/contact'

const ENDPOINT = import.meta.env.PUBLIC_WEB_FORMS_URL || 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.PUBLIC_WEB_FORMS_API_KEY

export function useContactForm() {
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: '', message: '' },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null)

    if (!ACCESS_KEY) {
      setSubmitError('Contact form is not configured yet.')
      return
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'New message from your portfolio',
          from_name: 'Portfolio contact form',
          email: values.email,
          message: values.message,
        }),
      })
      const data = await response.json()

      if (data.success) {
        setSent(true)
        form.reset()
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please try again.')
    }
  })

  const reset = () => {
    setSent(false)
    setSubmitError(null)
  }

  return {
    form,
    onSubmit,
    sent,
    submitError,
    reset,
    isSubmitting: form.formState.isSubmitting,
  }
}
