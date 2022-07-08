import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

const BuyFooter = () => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }
  return (
    <section 
      className='fixed-comp sub-footer'
    >
      <div className='footer-full-w-btn w-11/12'>
        <button 
          className='primary-btn'
          onClick={() => handleNavigate('buy')}
        >
          Buy Ticket
        </button>
      </div>
    </section>
  )
}

export default BuyFooter