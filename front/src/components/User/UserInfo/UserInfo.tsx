import React from 'react'
import {BiCopy} from 'react-icons/bi'
import { UserInfo } from '../../../context/AccountData'

interface Props {
  user: UserInfo,
}

const UserInfomation: React.FC<Props> = ({user}: Props): React.ReactElement => {
    console.log(user);
    
  return (
    <>
      <div className=' rounded-full overflow-hidden shadow-xl'>
        <img src={user.img} alt="User Avatar" className='object-cover w-32 h-32 object-center'/>
      </div>
      <div className='flex mt-6 items-center'>
        <p className='text-sm text-primaryColor font-semibold'>
          {user.user}
        </p>
        <button className='ml-2 text-lg opacity-60 hover:opacity-80'>
          <i><BiCopy /></i>
        </button>
      </div>
    </>
  )
}

export default UserInfomation