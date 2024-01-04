"use server"

import {
  messageToAI,
  sendConversationToAI,
  getAudioFromText,
} from "./apiOpenAI"

export const sendMessage = async (message) => {
  const answer = await messageToAI(message)
  return answer
}
export const sendConversation = async (messages) => {
  const answer = await sendConversationToAI(messages)
  return answer
}
