import OpenAI from "openai";
import { adminDb } from "@/lib/firebase-admin";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
  text,
  voice,
  voiceId,
  voiceName,
  provider,
  uid,
} = body;

    const finalVoiceId = voiceId || voice;
    const finalProvider = provider || "openai";

    if (!uid) {
      return Response.json(
        { error: "Login required" },
        { status: 401 }
      );
    }

    if (!text) {
      return Response.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    if (!finalVoiceId) {
      return Response.json(
        { error: "Voice is required" },
        { status: 400 }
      );
    }

    const userRef = adminDb
      .collection("users")
      .doc(uid);

    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const credits =
      userSnap.data()?.credits || 0;

    const creditsToCut =
      finalProvider === "elevenlabs"
        ? text.length * 3
        : text.length;

    if (credits < creditsToCut) {
      return Response.json(
        { error: "Not enough credits" },
        { status: 400 }
      );
    }

    let buffer: Buffer;

    if (finalProvider === "elevenlabs") {
      const elevenResponse = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${finalVoiceId}`,
        {
          method: "POST",
          headers: {
            "xi-api-key":
              process.env.ELEVENLABS_API_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            model_id:
              "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!elevenResponse.ok) {
        const errorData =
          await elevenResponse.json();

        return Response.json(
          {
            error:
              errorData?.detail?.message ||
              "ElevenLabs audio failed",
          },
          { status: 500 }
        );
      }

      buffer = Buffer.from(
        await elevenResponse.arrayBuffer()
      );
    } else {
      const mp3 =
        await openai.audio.speech.create({
          model: "tts-1-hd",
          voice: finalVoiceId,
          input: text,
        });

      buffer = Buffer.from(
        await mp3.arrayBuffer()
      );
    }

    await userRef.update({
      credits: credits - creditsToCut,
    });

    await adminDb.collection("history").add({
  uid,
  text,
  voice: voiceName || finalVoiceId,
  voiceId: finalVoiceId,
  provider: finalProvider,
  characters: text.length,
  creditsUsed: creditsToCut,
  createdAt: new Date(),
});

    return new Response(new Uint8Array(buffer), {
  headers: {
    "Content-Type": "audio/mpeg",
  },
});
  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        error:
          error?.message ||
          "Audio generation failed",
      },
      {
        status: 500,
      }
    );
  }
}