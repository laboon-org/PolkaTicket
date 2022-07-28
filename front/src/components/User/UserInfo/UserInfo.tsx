import React from 'react'
import {BiCopy} from 'react-icons/bi'

import IMG_AVATAR from '../../../assets/images/user-avatar.png'

const UserInfo = () => {
  return (
    <>
      <div className=' rounded-full overflow-hidden shadow-xl'>
        <img src={IMG_AVATAR} alt="User Avatar" className='object-cover w-32 h-32 object-center'/>
      </div>
      <div className='flex mt-6 items-center'>
        <p className='text-sm text-primaryColor font-semibold'>
          0x05611eAf8505bdAA991f0c62C
        </p>
        <button className='ml-2 text-lg opacity-60 hover:opacity-80'>
          <i><BiCopy /></i>
        </button>
      </div>
    </>
  )
}

export default UserInfo