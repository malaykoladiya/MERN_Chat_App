// Import necessary dependencies
import React, { useState } from 'react'; // Import React and useState hook
import { useAuthContext } from '../context/AuthContext'; // Import custom AuthContext hook
import toast from 'react-hot-toast'; // Import toast notification library

// Define custom hook useLogout
const useLogout = () => {
    const [loading, setLoading] = useState(false); // Initialize loading state with useState hook
    const { setAuthUser } = useAuthContext(); // Access setAuthUser function from AuthContext

    // Define logout function
    const logout = async () => {
        setLoading(true); // Set loading state to true

        try {
            const res = await fetch('/api/auth/logout', { // Send POST request to logout endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' } // Set request headers
            });

            const data = await res.json(); // Parse response data as JSON

            if (data.error) { // Check if response contains an error
                throw new Error(data.error); // Throw an error with the error message
            }

            localStorage.removeItem('chat-app-user'); // Remove user data from local storage
            setAuthUser(null); // Set authenticated user to null
        } catch (error) {
            toast.error(error.message); // Display error message using toast notification
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    // Return loading state and logout function
    return { loading, logout };
};

export default useLogout; // Export useLogout hook as default
