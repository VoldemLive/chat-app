"use client"
import Image from "next/image"
import styles from "./page.module.css"
import IncomeMessage from "./ui/incomeMessage/incomeMessage"
import SendMessage from "./ui/sendMessage/sendMessage"
import useStore from "./library/store"
import OutcomeMessage from "./ui/outcomeMessage/outcomeMessage"
import { useRef, useEffect, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"

export default function Home() {
  const divRef = useRef(null)
  const messages = useStore((state) => state.messages)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      localStorage.setItem("messages", JSON.stringify(messages))
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    if (isClient) scrollToBottom()
  }, [isClient])

  const scrollToBottom = () => {
    divRef.current?.scroll({
      top: divRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  if (!isClient) {
    return (
      <div className={styles.container}>
        <RiLoader4Line className={styles.rotate} />
      </div>
    )
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Chat app</h1>
      <div className={styles.chatHolder}>
        <div ref={divRef} className={styles.chat}>
          {messages.map((item) => (
            <div className={styles.messageHolder} key={item.id}>
              {item.incoming ? (
                <IncomeMessage key={item.time} item={item} />
              ) : (
                <OutcomeMessage key={item.time} item={item} />
              )}
            </div>
          ))}
        </div>
        <SendMessage />
      </div>
    </main>
  )
}
