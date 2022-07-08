import React, { useEffect, useState } from 'react'

import {TiPlus , TiMinus} from 'react-icons/ti'
import {TicketInfo} from '../../data/ticket_infos';


interface Props {
  ticket: TicketInfo;
}

const BuyTicketContent: React.FC<Props> = (props: Props): React.ReactElement => {
  const [amount, setAmount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const decreaseAmount = () => {
    if (amount > 1)
      setAmount((amount) => amount - 1);
  }
  const increaseAmount = () => {
    setAmount((amount) => amount + 1);
  }

  useEffect(() => {
    setTotalPrice(props.ticket.ticketPrice * amount);
  }, [amount, props.ticket.ticketPrice]) 
    
  return (
    <>
      <article className='flex-1 flex items-center justify-between'>
        <h6 className='buy-ticket-title'>Amount</h6>
        <div 
          className='buy-ticket-amount flex items-center justify-between 
            rounded-xl mt-2 w-1/2'
        >
          <button onClick={decreaseAmount}>
            <i><TiMinus /></i>
          </button>
          <p>{amount}</p>
          <button onClick={increaseAmount}>
            <i><TiPlus /></i>
          </button>
        </div>
      </article>
      {/* Total Price */}
      <article className='set-amount mt-6'>
        <div className='flex justify-between'>
          <h6 className='buy-ticket-title'>Total</h6>
          <div className='text-right'>
            <p className='text-primaryColor font-bold text-xl'>{totalPrice} XTZ</p>
            <p className='text-gray-400'>(19,564213$)</p>
          </div>
        </div>
        
      </article>
    </>
  )
}

export default BuyTicketContent