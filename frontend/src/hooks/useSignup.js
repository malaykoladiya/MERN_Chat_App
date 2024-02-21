// Import necessary dependencies
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

// Define the custom hook useSignup
const useSignup = () => {
    // Define state variables
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    // Define the signup function
    const signup = async ({firstName, lastName, username, password, confirmPassword, gender}) => {
        // Validate input
        const success = handleInputError({firstName, lastName, username, password, confirmPassword, gender});
        if (!success) return;

        // Set loading state to true
        setLoading(true);
        try {
            // Send a POST request to the server to create a new user
            const res = await fetch("/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName, lastName, username, password, confirmPassword, gender})
            });
            const data = await res.json();
            if (data.error) {
                // Throw an error if the server returns an error message
                throw new Error(data.error);
            }
            
            // Store user data in local storage
            localStorage.setItem('chat-app-user', JSON.stringify(data));
            // Set the authenticated user in the context
            setAuthUser(data);

            // Log the data to the console
            console.log(data);
        } catch (error) {
            // Display an error toast if an error occurs
            toast.error(error.message);
        } finally {
            // Set loading state to false
            setLoading(false);
        }
    }

    // Return the loading state and the signup function
    return {loading, signup};
}

// Export the useSignup hook as the default export
export default useSignup;

// Define a helper function to handle input validation
function handleInputError({firstName, lastName, username, password, confirmPassword, gender}) {
    // Check if any required field is empty
    if (!firstName || !lastName || !username || !password || !confirmPassword || !gender ) {
        toast.error('Please fill in all the fields');
        return false;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }
    
    // Return true if all validations pass
    return true;
}