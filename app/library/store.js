import { create } from "zustand"

const useStore = create((set) => {
  const initialState = () => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("messages")
      if (savedMessages) {
        try {
          return JSON.parse(savedMessages)
        } catch (error) {
          console.error("Error get messages from localStorage:", error)
        }
      }
    }
    return []
  }

  return {
    messages: initialState(),
    addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),
  }
})

export default useStore
