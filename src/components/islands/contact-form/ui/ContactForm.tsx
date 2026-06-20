import { Button, Input, Textarea } from '@components/ui'

import { useContactForm } from '../hooks/useContactForm'

export function ContactForm() {
  const { form, onSubmit, sent, submitError, reset, isSubmitting } = useContactForm()
  const {
    register,
    formState: { errors },
  } = form

  if (sent) {
    return (
      <div data-card className="glass-2 rounded-(--card-radius) px-7 py-10 text-center">
        <div className="bg-accent text-accent-contrast mx-auto mb-[18px] grid size-14 place-items-center rounded-full">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display text-ink mb-2 text-[22px] font-bold">Message sent!</h3>
        <p className="text-dim mb-[18px] text-[15px]">
          Thanks for reaching out — I'll get back to you soon.
        </p>
        <button
          type="button"
          onClick={reset}
          className="border-card-border text-ink rounded-full border px-[18px] py-2.5 text-[14px] font-semibold"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
      <Input
        type="email"
        placeholder="Your email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Textarea
        placeholder="Your message"
        error={errors.message?.message}
        {...register('message')}
      />

      {submitError && <p className="text-sm text-red-500">{submitError}</p>}

      <Button
        type="submit"
        variant="accent"
        disabled={isSubmitting}
        className="rounded-(--card-radius) px-6 py-4 text-[15.5px] font-bold"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
        </svg>
      </Button>
    </form>
  )
}
