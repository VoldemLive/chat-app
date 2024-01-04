"use client"
import Image from "next/image"
import styles from "./page.module.css"
import IncomeMessage from "./ui/incomeMessage/incomeMessage"
import SendMessage from "./ui/sendMessage/sendMessage"
import useStore from "./library/store"
import OutcomeMessage from "./ui/outcomeMessage/outcomeMessage"

export default function Home() {
  const messages = useStore((state) => state.messages)
  console.log(messages)
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Chat app</h1>
      <div className={styles.chatHolder}>
        <div className={styles.chat}>
          {messages.map((item) =>
            item.incoming ? (
              <IncomeMessage key={item.time} item={item} />
            ) : (
              <OutcomeMessage key={item.time} item={item} />
            )
          )}
        </div>
        <SendMessage />
      </div>
    </main>
  )
}
