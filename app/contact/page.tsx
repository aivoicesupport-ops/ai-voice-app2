export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      <h1 className="text-5xl font-bold mb-8">
        Contact Us
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <p className="text-zinc-300 mb-6">
          Need help? We're here to assist you.
        </p>

        <div className="space-y-4">

          <div>
            <p className="text-zinc-400">
              Support Email
            </p>

            <p className="font-semibold text-green-400">
              aivoice.support@gmail.com
            </p>
          </div>

          <div>
            <p className="text-zinc-400">
              Support Hours
            </p>

            <p>
              Monday - Saturday
            </p>
          </div>

          <div>
            <p className="text-zinc-400">
              Response Time
            </p>

            <p>
              Within 24-48 Hours
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}