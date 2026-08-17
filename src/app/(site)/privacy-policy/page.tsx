export default function PrivacyPolicyPage() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-amber font-semibold tracking-widest text-sm uppercase">
          Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/50">Last updated: August 2026</p>

        <div className="mt-10 space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              1. Information We Collect
            </h2>
            <p className="mt-3">
              When you register for a trial, tournament, or event with
              Playmakerz, we collect your name, age, phone number, email
              address, playing preferences, and payment details necessary to
              process your registration.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              2. How We Use Your Information
            </h2>
            <p className="mt-3">
              We use this information to process your registration and
              payment, confirm your trial or event slot, and send you updates
              about venue, timing, and logistics via email and WhatsApp. We
              do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              3. Payment Processing
            </h2>
            <p className="mt-3">
              Payments are processed securely through Razorpay. Playmakerz
              does not store your card, UPI, or banking details — these are
              handled directly by Razorpay in accordance with their own
              security standards and privacy policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              4. Communication
            </h2>
            <p className="mt-3">
              By registering, you consent to receive transactional messages
              from Playmakerz related to your registration via email and
              WhatsApp (using Meta&apos;s WhatsApp Business Platform). These
              messages are limited to registration confirmations, venue and
              timing details, and related updates.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              5. Data Security
            </h2>
            <p className="mt-3">
              We take reasonable technical and organizational measures to
              protect your personal information from unauthorized access,
              alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              6. Contact Us
            </h2>
            <p className="mt-3">
              For any questions about this Privacy Policy or your personal
              data, contact us at{" "}
              <a href="mailto:info@playmakerz.in" className="text-amber hover:underline">
                info@playmakerz.in
              </a>{" "}
              or +91-9999474562.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
