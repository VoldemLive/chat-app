"use client"

import { useState } from "react"
import styles from "./sendMessage.module.css"
import { RiSendPlaneFill, RiLoader4Line } from "react-icons/ri"
import { sendMessage } from "@/app/library/actions"
import useStore from "@/app/library/store"

const SendMessage = () => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const addMessage = useStore((state) => state.addMessage)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      addMessage({
        author: "Voldem",
        time: new Date().toLocaleTimeString(),
        text: message,
        incoming: false,
      })
      const newMessage = await sendMessage(message)
      console.log(newMessage)
      addMessage({
        author: "AI",
        time: new Date().toLocaleTimeString(),
        text: newMessage,
        incoming: true,
      })
      setMessage("")
    } catch (error) {
      console.error("Error on sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
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
