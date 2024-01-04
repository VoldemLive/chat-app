import OpenAI from "openai"

const openai = new OpenAI(process.env.OPENAI_API_KEY)

export default async function handler(req, res) {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: req.body.text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    res.status(200).send(buffer)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "audio generatiob failed" })
  }
}
