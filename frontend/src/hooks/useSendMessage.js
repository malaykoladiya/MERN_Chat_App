// Import React and useState from 'react' library
import React, { useState } from 'react';

// Import useConversation hook from '../zustand/useConversation' file
import useConversation from '../zustand/useConversation';

// Import toast from 'react-hot-toast' library
import toast from 'react-hot-toast';

// Define a custom hook named useSendMessage
const useSendMessage = () => {
    // Declare a state variable 'loading' and its setter function 'setLoading' using useState hook
    const [loading, setLoading] = useState(false);

    // Destructure 'messages', 'setMessages', and 'selectedConversation' from the result of useConversation hook
    const { messages, setMessages, selectedConversation } = useConversation();

    // Define an asynchronous function named 'sendMessage' that takes a 'message' parameter
    const sendMessage = async (message) => {
        // Set 'loading' state to true
        setLoading(true);

        try {
            // Send a POST request to the server with the selected conversation ID and the message
            const response = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            // Parse the response data as JSON
            const data = await response.json();

            // If the response data contains an error, throw an Error object with the error message
            if (data.error) {
                throw new Error(data.error);
            }

            // Update the 'messages' state by adding the new message data to the existing messages array
            setMessages([...messages, data]);

        } catch (error) {
            // Display an error toast notification with the error message
            toast.error(error.message);

        } finally {
            // Set 'loading' state back to false
            setLoading(false);
        }
    }

    // Return an object with the 'sendMessage' function and the 'loading' state
    return { sendMessage, loading }
}

// Export the useSendMessage hook as the default export of the module
export default useSendMessage;
