import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
  
  const {authUser} = useAuthContext();
  const {selectedConversation} =  useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? 'bg-info bg-opacity-75' : 'bg-base bg-opacity-75';
  const shakeClass = message.shouldShake ? 'shake' : '';
  const headerName = fromMe ? authUser.firstName : selectedConversation?.firstName;

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="Tailwind CSS chat bubble component" />
            </div>
        </div>
        <div className={`chat-header text-gray-100 text-xs`}>{headerName}</div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-1 p-2 shadow-md`}> {message.message}</div>
        <div className='chat-footer text-white opacity-50 text-xs flex gap-1 items-center'> {formattedTime} </div>
    </div>
  )
}

export default Message