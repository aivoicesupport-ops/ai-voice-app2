export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      <h1 className="text-5xl font-bold mb-8">
        About Us
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-4">
          AI Voice App
        </h2>

        <p className="text-zinc-300 leading-8">
          AI Voice App is a simple and affordable AI
          text-to-speech platform designed for students,
          creators, businesses and content makers.
        </p>

        <p className="text-zinc-300 leading-8 mt-4">
          Our mission is to provide high-quality AI voices
          at affordable pricing with an easy-to-use
          experience.
        </p>

        <p className="text-zinc-300 leading-8 mt-4">
          Users can convert text into natural sounding
          speech, download audio files and use them for
          videos, learning, presentations and content
          creation.
        </p>

        <div className="mt-8 border-t border-zinc-700 pt-6">

          <p className="text-zinc-400">
            Contact:
          </p>

          <p className="font-semibold text-green-400">
            aivoice.support@gmail.com
          </p>

        </div>

      </div>

    </div>
  );
}