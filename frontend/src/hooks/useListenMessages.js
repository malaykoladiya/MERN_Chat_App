// Import React and useEffect from 'react' module
import React, { useEffect } from 'react';

// Import useSocketContext and useConversation hooks from respective files
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';

// Import notificationSound from the specified file path
import notificationSound from "../assets/sounds/ios_notification.mp3";

// Define a custom hook named useListenMessages
const useListenMessages = () => {
    // Access the socket object from the useSocketContext hook
    const { socket } = useSocketContext();

    // Access the messages and setMessages functions from the useConversation hook
    const { messages, setMessages } = useConversation();

    // Run the effect when the component mounts or when the dependencies change
    useEffect(() => {
        // Listen for the "newMessage" event from the socket
        socket?.on("newMessage", (newMessages) => {
            // Add a property shouldShake to the newMessages object
            newMessages.shouldShake = true;

            // Create a new Audio object with the notification sound
            const sound = new Audio(notificationSound);

            // Play the notification sound
            sound.play();

            // Update the messages state by adding the newMessages object
            setMessages([...messages, newMessages]);
        });

        // Clean up the event listener when the component unmounts
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
};

// Export the useListenMessages hook as the default export
export default useListenMessages;
