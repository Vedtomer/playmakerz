export default function TermsOfServicePage() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-amber font-semibold tracking-widest text-sm uppercase">
          Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/50">Last updated: August 2026</p>

        <div className="mt-10 space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              1. About Playmakerz
            </h2>
            <p className="mt-3">
              Playmakerz Sports and Events conceptualizes, plans, manages, and
              executes corporate sports tournaments, trials, and travel
              experiences, including the Faridabad Premier League (FPL) and
              Playmakerz Champions League (PCL).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              2. Registration and Payment
            </h2>
            <p className="mt-3">
              Registering for a trial or tournament requires accurate
              personal details and payment of the applicable fee through our
              payment partner, Razorpay. Your registration is confirmed only
              after successful payment.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              3. Cancellations and Refunds
            </h2>
            <p className="mt-3">
              Refund requests for trials or tournaments are handled on a
              case-by-case basis. Contact us at info@playmakerz.in within 48
              hours of registration to request a cancellation or refund.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              4. Communications
            </h2>
            <p className="mt-3">
              By registering, you agree to receive transactional
              communications from Playmakerz regarding your registration —
              including venue, timing, and logistics — via email and
              WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              5. Limitation of Liability
            </h2>
            <p className="mt-3">
              Playmakerz is not liable for injuries, losses, or damages
              arising from participation in trials, tournaments, or travel
              organized by us, except where required by law. Participants
              take part at their own risk.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              6. Changes to These Terms
            </h2>
            <p className="mt-3">
              We may update these Terms from time to time. Continued use of
              our services after changes are posted constitutes acceptance
              of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white">
              7. Contact Us
            </h2>
            <p className="mt-3">
              For questions about these Terms, contact us at{" "}
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
