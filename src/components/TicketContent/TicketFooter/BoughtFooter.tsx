import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

const BoughtFooter: React.FC = (): React.ReactElement => {
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
          onClick={() => handleNavigate('qr_code')}
        >
          Show QR Code
        </button>
        <div className='flex mt-4'>
          <button 
            className='secondary-btn'
            onClick={() => handleNavigate('upgrade')}
          >
            Upgrade
          </button>
          <button 
            className='secondary-btn ml-4'
            onClick={() => handleNavigate('transfer')}
          >
            Transfer
          </button>
        </div>
      </div>
    </section>
  )
}

export default BoughtFooter