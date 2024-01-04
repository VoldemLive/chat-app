import styles from "./outcomeMessage.module.css"
import Image from "next/image"
import { RiVolumeUpLine, RiVolumeMuteLine, RiLoader4Line } from "react-icons/ri"
import { useState } from "react"

const OutcomeMessage = ({ item }) => {
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const { text, author, time } = item
  var audio = new Audio()

  const stopAudio = () => {
    audio.pause()
    setAudioPlaying(false)
  }

  const handleGenerateAudio = async () => {
    setAudioLoading(true)
    console.log(text)
    const response = await fetch("/api/generateAudio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (response.ok) {
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      audio = new Audio(audioUrl)

      audio.addEventListener("play", () => setAudioPlaying(true))
      audio.addEventListener("ended", () => setAudioPlaying(false))

      audio
        .play()
        .catch((error) => console.error("Ошибка воспроизведения:", error))
      setAudioLoading(false)
      return () => {
        audio.removeEventListener("play", () => setAudioPlaying(true))
        audio.removeEventListener("ended", () => setAudioPlaying(false))
      }
    } else {
      setAudioLoading(false)
      console.error("Ошибка при получении аудио")
    }
  }
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
        <div className={styles.audioHolder}>
          {audioLoading ? (
            <RiLoader4Line className={styles.rotate} />
          ) : audioPlaying ? (
            <RiVolumeMuteLine
              onClick={stopAudio}
              className={styles.speakIcon}
            />
          ) : (
            <RiVolumeUpLine
              onClick={handleGenerateAudio}
              className={styles.speakIcon}
            />
          )}
        </div>
      </div>
      <p className={styles.messageText}>{text}</p>
    </div>
  )
}

export default OutcomeMessage
