'use client'

export default function Newsletter() {
  return (
    <div className="w-full lg:w-auto lg:text-right">
      <h3
        className="text-lg font-normal leading-snug mb-4"
        style={{ color: 'var(--luxury-charcoal)' }}
      >
        Be the First One to Hear About Updates
      </h3>
      <form
        className="flex w-full max-w-sm lg:ml-auto"
        action=""
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
        rel="noreferrer"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="EMAIL"
          placeholder="Enter your email"
          autoComplete="email"
          required
          className="flex-1 min-w-0 bg-white py-3 px-5 text-sm placeholder-luxury-muted focus:outline-none transition-colors"
          style={{ border: '1px solid var(--luxury-border)', color: 'var(--luxury-charcoal)' }}
        />
        <button
          type="submit"
          name="subscribe"
          aria-label="Subscribe to newsletter"
          className="px-6 py-3 text-sm font-medium tracking-wide shrink-0 transition-colors"
          style={{ background: 'var(--luxury-gold)', color: 'var(--luxury-charcoal)' }}
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}
