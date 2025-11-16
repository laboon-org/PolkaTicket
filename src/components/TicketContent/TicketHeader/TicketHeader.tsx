import React from 'react'

import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface Props {
  image: string;
  rootURL: string,
}

const TicketHeader: React.FC<Props> = ({image, rootURL}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (): void => {
    navigate(rootURL);
  }
  return (
    <>
      <div className='h-72 w-full relative'>
        <img src={image} alt="Ticket" className='object-cover h-full w-full object-center'/>
        <i 
          className='ticket-getback absolute top-9 left-4 text-primaryColor text-2xl 
            p-2 bg-white rounded-full cursor-pointer opacity-80 hover:opacity-100'
          onClick={handleNavigate}
        >
          <IoMdArrowRoundBack />
        </i>
      </div>
    </>
  )
}

export default TicketHeader