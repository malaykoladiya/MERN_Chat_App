// Import necessary dependencies
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Define a custom hook named useLogin
const useLogin = () => {
    // Define state variables
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    // Define a login function
    const login = async (username, password) => {
        // Validate input fields
        const success = handleInputError(username, password);
        if (!success) return;

        // Set loading state to true
        setLoading(true);

        try {
            // Send a POST request to the login API
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            });

            // Parse the response data
            const data = await res.json();

            // Check for errors in the response
            if (data.error) {
                throw new Error(data.error);
            }

            // Store the user data in local storage
            localStorage.setItem("chat-app-user", JSON.stringify(data));

            // Set the authenticated user in the context
            setAuthUser(data);
        } catch (error) {
            // Display error message using toast
            toast.error(error.message);
        } finally {
            // Set loading state to false
            setLoading(false);
        }
    };

    // Return loading state and login function
    return { loading, login };
};

// Export the useLogin hook as default
export default useLogin;

// Define a helper function to handle input errors
function handleInputError(username, password) {
    // Check if username or password is empty
    if (!username || !password) {
        // Display error message using toast
        toast.error('Please fill in all the fields');
        return false;
    }
    
    return true;
}