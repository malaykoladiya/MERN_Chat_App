import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
    
    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation])

    return (
        <div className='sm:min-w-[450px] md:min-w-[650px] lg:min-w-[768px] border border-black border-opacity-50 flex flex-col bg-black bg-opacity-25 shadow-xl rounded-lg overflow-hidden'>
            {!selectedConversation ? (
                <NoChatSelected/> 
            ) : (
            <>
                {/* Header */}
                <div className='bg-teal-800 px-4 py-2 mb-2 shadow-md flex items-center bg-opacity-70 rounded-t-lg'>
                    <span className='text-gray-200 font-medium'> To:</span>{" "}
                    <span className='text-gray-100 font-bold ml-2'> {selectedConversation.firstName} { selectedConversation.lastName}</span>
                </div>

                <Messages/>
                <MessageInput/>
            </>

            )}
        </div>
    )
}

export default MessageContainer;

const NoChatSelected = () => {
    const {authUser} = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-80'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-300 font-semibold flex flex-col items-center gap-4'>
                <p> Welcome 👋 {authUser.firstName} {authUser.lastName} !</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className=' text-teal-600 text-4xl md:text-8cl text-center' />
            </div>
        </div>
    )
}


