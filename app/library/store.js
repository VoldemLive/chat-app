import { create } from "zustand"

const useStore = create((set) => ({
  messages: [
    {
      author: "AI",
      time: "12:15",
      text: "Ask something what you want...",
      incoming: true,
    },
  ],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}))

export default useStore
