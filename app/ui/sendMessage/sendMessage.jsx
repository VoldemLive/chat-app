"use client"

import { useState, useRef } from "react"
import styles from "./sendMessage.module.css"
import { RiSendPlaneFill, RiLoader4Line } from "react-icons/ri"
import { sendConversation } from "@/app/library/actions"
import useStore from "@/app/library/store"
import { uid } from "uid"
import { messagesAdapter } from "@/app/library/messagesAdapter"

const SendMessage = () => {
  const [message, setMessage] = useState("")
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const addMessage = useStore((state) => state.addMessage)
  const messages = useStore((state) => state.messages)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const newOutgoingMessage = {
      author: "You",
      time: new Date().toLocaleTimeString(),
      text: message,
      incoming: false,
      id: uid(),
    }
    try {
      addMessage(newOutgoingMessage)
      const correctConversation = messagesAdapter([
        ...messages,
        newOutgoingMessage,
      ])
      const newMessage = await sendConversation(correctConversation)

      addMessage({
        author: "AI",
        time: new Date().toLocaleTimeString(),
        text: newMessage,
        incoming: true,
        id: uid(),
      })
      setMessage("")
    } catch (error) {
      inputRef.current.focus()
      console.error("Error on sending message:", error)
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current.focus(), 0)
    }
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        autoFocus
        ref={inputRef}
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.input}
        placeholder="Type your message here..."
        disabled={isLoading}
      ></input>
      <button
        disabled={isLoading || !message}
        type="submit"
        className={styles.button}
      >
        {isLoading ? (
          <RiLoader4Line className={(styles.buttonLogo, styles.rotate)} />
        ) : (
          <RiSendPlaneFill className={styles.buttonLogo} />
        )}
      </button>
    </form>
  )
}

export default SendMessage
