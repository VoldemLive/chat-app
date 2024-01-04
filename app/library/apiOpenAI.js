import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
})

export async function messageToAI(message) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "gpt-3.5-turbo",
  })
  return chatCompletion.choices[0].message.content
}

export async function sendConversationToAI(messages) {
  console.log(messages)
  const chatCompletion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  })
  return chatCompletion.choices[0].message.content
}
