export async function GET() {
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v2/voices",
      {
        method: "GET",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return Response.json({
      success: response.ok,
      voicesCount: data.voices?.length || 0,
      voices: data.voices?.map((voice: any) => ({
        name: voice.name,
        voice_id: voice.voice_id,
        preview_url: voice.preview_url,
        language: voice.labels?.language || "",
        gender: voice.labels?.gender || "",
        accent: voice.labels?.accent || "",
        use_case: voice.labels?.use_case || "",
      })),
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        error: "ElevenLabs test failed",
      },
      { status: 500 }
    );
  }
}