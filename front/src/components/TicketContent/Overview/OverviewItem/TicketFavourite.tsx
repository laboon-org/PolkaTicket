import React, { ReactElement } from 'react'

import { BsHeart } from 'react-icons/bs'

const TicketFavourite: React.FC = (): ReactElement => {
  return (
    <>
      <button 
        className='cursor-pointer opacity-80 hover:opacity-100'
      >
        <i className='text-xl text-primaryColor'><BsHeart /></i>
      </button>
    </>
  )
}

export default TicketFavourite