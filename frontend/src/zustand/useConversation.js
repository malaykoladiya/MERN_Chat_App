// Importing the 'create' function from the 'zustand' library
import { create } from "zustand";

// Creating a custom hook called 'useConversation' using the 'create' function
const useConversation = create((set) => ({
    // Initializing the 'selectedConversation' state variable with a value of 'null'
    selectedConversation: null,

    // Defining a function called 'setSelectedConversation' that takes a 'selectedConversation' parameter
    // and updates the 'selectedConversation' state variable with the provided value
    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),

    // Initializing the 'messages' state variable with an empty array
    messages: [],

    // Defining a function called 'setMessages' that takes a 'messages' parameter
    // and updates the 'messages' state variable with the provided value
    setMessages: (messages) => set({ messages }),
}));

// Exporting the 'useConversation' custom hook as the default export of the module
export default useConversation;