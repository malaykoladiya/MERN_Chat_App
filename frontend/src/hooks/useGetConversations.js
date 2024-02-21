// Importing necessary dependencies
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

// Custom hook to fetch conversations
const useGetConversations = () => {
    // State variables to track loading state and conversations
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        // Function to fetch conversations
        const getConversations = async () => {
            setLoading(true); // Set loading state to true

            try {
                // Fetch conversations from the server
                const res = await fetch('/api/users', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });

                // Parse the response data
                const data = await res.json();

                if(data.error) {
                    throw new Error(data.error); // Throw an error if there is an error in the response data
                }

                setConversations(data); // Set the conversations state with the fetched data
            } catch (error) {
                toast.error(error.message); // Display an error toast if there is an error during the fetch
            } finally {
                setLoading(false); // Set loading state to false
            }
        }

        getConversations(); // Call the function to fetch conversations
    }, []);

    // Return the loading state and conversations as an object
    return {loading, conversations}
}

export default useGetConversations; // Export the custom hook
