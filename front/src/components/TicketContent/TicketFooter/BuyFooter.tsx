import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TicketInterface } from '../../../api/queries';

interface Props {
  ticket: TicketInterface
}

const BuyFooter: React.FC<Props> = ({ticket}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const isBought = true;
  const handleNavigate = (): void => {
    if (isBought)
      navigate('confirm', {state: {ticket: ticket}});
    else
      navigate('add_funds', {state: {ticket: ticket}});
  }
  return (
    <section 
      className='fixed-comp sub-footer'
    >
      <div className='footer-full-w-btn w-11/12'>
        <button 
          className='primary-btn'
          onClick={handleNavigate}
        >
          Buy Ticket
        </button>
      </div>
    </section>
  )
}

export default BuyFooter