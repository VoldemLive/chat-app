export const messagesAdapter = (messages) => {
  return messages.reduce((acc, message) => {
    if (message.role === "AI")
      acc.push({ role: "assistant", content: message.text })
    else acc.push({ role: "user", content: message.text })
    return acc
  }, [])
}
