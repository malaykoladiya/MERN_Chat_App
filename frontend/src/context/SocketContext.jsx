// Import necessary dependencies from React
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";

// Import socket.io-client library
import io from 'socket.io-client';

// Create a new context for socket
const SocketContext = createContext();

// Custom hook to access the socket context
export const useSocketContext = () =>{
    return useContext(SocketContext);
}

// Socket context provider component
export const SocketContextProvider = ({children}) => {
    
    // State to hold the socket instance
    const [socket, setSocket] = useState(null);

    // State to hold the list of online users
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Access the authenticated user from AuthContext
    const {authUser} = useAuthContext();

    // Effect hook to establish and manage the socket connection
    useEffect(() => {
        if(authUser) {
            // Connect to the server using socket.io-client
            const socket = io.connect("https://chat-application-m208.onrender.com",{
                query : { 
                    userId: authUser._id,
                }
            });

            // Set the socket instance in state
            setSocket(socket);

            // Listen for "getOnlineUsers" event and update the online users list
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Clean up the socket connection when component unmounts
            return () => socket.close();
        } else {
            // Close the socket connection and reset the socket instance if user is not authenticated
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);
    
    // Provide the socket instance and online users list to the child components
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}