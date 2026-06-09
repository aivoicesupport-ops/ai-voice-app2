export default function GeneratorCard({
  credits,
  text,
  setText,
  voice,
  setVoice,
  loading,
  generateAudio,
  audioUrl,
}: {
  credits: number;
  text: string;
  setText: any;
  voice: string;
  setVoice: any;
  loading: boolean;
  generateAudio: () => void;
  audioUrl: string;
}) {
  return (
    <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
   <select
  value={voice}
  onChange={(e) => setVoice(e.target.value)}
  className="w-full mb-4 bg-black border border-zinc-700 rounded-2xl p-4 text-white"
>
  <option value="alloy">Alloy Voice</option>
  <option value="echo">Echo Voice</option>
  <option value="nova">Nova Voice</option>
  <option value="shimmer">Shimmer Voice</option>
</select>
<textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Type your text here..."
  className="w-full h-56 bg-black border border-zinc-700 rounded-2xl p-5 outline-none resize-none text-lg"
/>
<div className="flex justify-between text-sm text-zinc-400 mt-2">
  <p>
    Characters: {text.length}
  </p>

  <p>
    Credits Left: {credits}
  </p>
</div>

<button
  onClick={generateAudio}
  className="w-full mt-6 bg-white text-black py-4 rounded-2xl font-semibold text-lg"
>
  {loading ? "Generating..." : "Generate Audio"}
</button>

{audioUrl && (
  <audio
    controls
    className="w-full mt-6"
    src={audioUrl}
  />
)}

{audioUrl && (
  <a
    href={audioUrl}
    download="ai-voice.mp3"
    className="block w-full mt-4 text-center bg-green-600 py-3 rounded-2xl font-semibold"
  >
    Download Audio
  </a>
)}
    </div>
  );
}