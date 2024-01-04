import styles from "./outcomeMessage.module.css"
import Image from "next/image"

const OutcomeMessage = ({ item }) => {
  const { text, author, time } = item
  return (
    <div className={styles.container}>
      <div className={styles.avatarHoler}>
        <Image
          className={styles.avatar}
          src="https://images.pexels.com/photos/2071881/pexels-photo-2071881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
