// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

// Define a custom hook named useGetMessages
const useGetMessages = () => {
    // Define state variables
    const [loading, setLoading] = useState(false);

    // Access messages, setMessages, and selectedConversation from useConversation hook
    const { messages, setMessages, selectedConversation } = useConversation();

    // Define an effect to fetch messages when selectedConversation changes
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true); // Set loading state to true

            try {
                // Fetch messages from the server
                const res = await fetch(`/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json(); // Parse the response data

                if (data.error) {
                    throw new Error(data.error); // Throw an error if there is an error in the response data
                }

                setMessages(data); // Update the messages state with the fetched data
            } catch (error) {
                toast.error(error.message); // Display an error toast if there is an error during the fetch
            } finally {
                setLoading(false); // Set loading state to false
            }
        };

        // Call getMessages function only if selectedConversation._id exists
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]);

    // Return messages and loading state
    return { messages, loading };
};

export default useGetMessages;