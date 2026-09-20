export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#02070b] px-5 py-14 text-white">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs tracking-[0.3em] text-cyan-400">
          NEON LABS
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-6 leading-7 text-slate-300">
          <p>
            NEON LABS collects only information needed to process
            purchases, provide buyer access, manage licenses and support
            the NEON AI Build Kit.
          </p>

          <p>
            Purchase information may include an email address or mobile
            number, payment/order identifiers, license status and
            transaction status.
          </p>

          <p>
            UPI PINs, card PINs, OTPs and banking passwords are not
            collected by this website.
          </p>

          <p>
            Payments are processed through Razorpay.
          </p>

          <p>
            Access records may be stored so verified buyers can use
            protected product features.
          </p>

          <p className="text-sm text-slate-500">
            Last updated: September 20, 2026
          </p>
        </div>
      </article>
    </main>
  );
}
