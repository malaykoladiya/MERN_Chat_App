import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'


const Home = () => {
  
  

  return (
  <div className='flex h-full max-w-full rounded-lg overflow-hidden bg-gray-200 bg-clip-padding backdrop-filter bg-opacity-10 shadow-xl'>

    <Sidebar/> 
    <MessageContainer/>
  </div>
  
  )
}
export default Home