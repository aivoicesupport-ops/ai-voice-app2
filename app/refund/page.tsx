export default function RefundPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      <h1 className="text-5xl font-bold mb-8">
        Refund Policy
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <p className="text-zinc-300 mb-4">
          At AI Voice App, customer satisfaction is important
          to us. Please read our refund policy carefully.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">
          Digital Services
        </h2>

        <p className="text-zinc-300">
          Since AI Voice App provides digital services and
          credits are consumed immediately after use, refunds
          are generally not provided for used credits.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">
          Duplicate Payments
        </h2>

        <p className="text-zinc-300">
          If you are charged multiple times for the same
          transaction, please contact us and we will review
          the payment and issue a refund if applicable.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">
          Technical Issues
        </h2>

        <p className="text-zinc-300">
          If a payment is successful but credits are not
          added to your account due to a technical issue,
          we will investigate and resolve the issue.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">
          Contact
        </h2>

        <p className="font-semibold text-green-400">
          aivoice.support@gmail.com
        </p>

      </div>

    </div>
  );
}