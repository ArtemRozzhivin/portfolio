import { z } from 'zod'

export const contactSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
})

export type ContactValues = z.infer<typeof contactSchema>
