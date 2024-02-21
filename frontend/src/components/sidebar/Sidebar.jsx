import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'


const Sidebar = () => {
  return (
    <div className='sm:max-w-[250px] md:max-w-[450px] border border-black border-opacity-50 p-4 flex flex-col rounded-lg bg-black bg-opacity-25 shadow-lg'>
        <SearchInput/>
        <div className='divider px-2'></div>
        <Conversations />
        <LogoutButton/>
    </div>
  )
}

export default Sidebar