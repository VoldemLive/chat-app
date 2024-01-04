import { create } from "zustand"

const useStore = create((set) => {
  const initialState = JSON.parse(localStorage.getItem("messages")) || []
  return {
    messages: initialState,
    addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),
  }
})

export default useStore
