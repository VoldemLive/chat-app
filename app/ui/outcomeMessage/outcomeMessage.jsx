import styles from "./outcomeMessage.module.css"
import Image from "next/image"

const OutcomeMessage = ({ item }) => {
  const { text, author, time } = item
  return (
    <div className={styles.container}>
      <div className={styles.avatarHoler}>
        <Image
          className={styles.avatar}
          src="/human.jpeg"
          alt=""
          width={60}
          height={60}
        ></Image>
        <p className={styles.authorName}>{author}</p>
      </div>
      <p className={styles.messageText}>{text}</p>
    </div>
  )
}

export default OutcomeMessage
