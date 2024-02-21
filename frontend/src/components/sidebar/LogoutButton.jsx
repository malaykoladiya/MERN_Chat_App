import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {

  const {loading, logout} = useLogout();
  return (
    <div className='mt-auto'>
      { !loading ?(
        <BiLogOut className="w-8 h-8 text-white cursor-pointer hover:text-sky-500" onClick={logout} />
      ):(
        <span className='laoding loading-spinner'></span>
      )}
    </div>
  )
}

export default LogoutButton