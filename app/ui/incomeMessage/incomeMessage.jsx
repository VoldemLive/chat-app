import styles from "./incomeMessage.module.css"
import Image from "next/image"
import { RiVolumeUpLine, RiVolumeMuteLine, RiLoader4Line } from "react-icons/ri"
import { useState, useEffect } from "react"

const IncomeMessage = ({ item }) => {
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const { text, author, time } = item
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause()
        audio.removeEventListener("play", onPlay)
        audio.removeEventListener("ended", onEnded)
      }
    }
  }, [audio])

  const onPlay = () => setAudioPlaying(true)
  const onEnded = () => setAudioPlaying(false)

  const handleGenerateAudio = async () => {
    setAudioLoading(true)
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
      const newAudio = new Audio(audioUrl)

      newAudio.addEventListener("play", onPlay)
      newAudio.addEventListener("ended", onEnded)

      setAudio(newAudio)
      newAudio.play().catch((error) => {
        console.error("Error playing audiofile:", error)
        alert("Please tap the play button to start audio")
      })
      setAudioLoading(false)
    } else {
      setAudioLoading(false)
      console.error("Can't recieve audio")
    }
  }

  const stopAudio = () => {
    if (audio) {
      audio.pause()
      setAudioPlaying(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatarHoler}>
        <Image
          className={styles.avatar}
          src="/ai.jpeg"
          alt=""
          width={60}
          height={60}
        ></Image>
        <p className={styles.authorName}>{author}</p>
        {audioLoading ? (
          <RiLoader4Line className={styles.rotate} />
        ) : audioPlaying ? (
          <RiVolumeMuteLine onClick={stopAudio} className={styles.speakIcon} />
        ) : (
          <RiVolumeUpLine
            onClick={handleGenerateAudio}
            className={styles.speakIcon}
          />
        )}
      </div>
      <p className={styles.messageText}>{text}</p>
    </div>
  )
}

export default IncomeMessage
