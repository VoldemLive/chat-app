"use server"

import messageToAI from "./apiOpenAI"

export const sendMessage = async (message) => {
  const answer = await messageToAI(message)
  return answer
}
