import React, { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

const BoughtFooter: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  const handleNavigate = (url: string): void => {
    navigate(url);
  }
  
  const handleQRClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  }
  return (
    <>
      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className='fixed inset-0 flex items-center justify-center z-50' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className='bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center animate-bounce'>
            <div className='text-6xl mb-4'>🚧</div>
            <h3 className='text-2xl font-bold mb-2'>Coming Soon!</h3>
            <p className='text-gray-600'>QR Code feature will be available after blockchain integration is complete.</p>
          </div>
        </div>
      )}
      
      <section 
        className='fixed-comp sub-footer'
      >
        <div className='footer-full-w-btn w-11/12'>
          <button 
            className='primary-btn'
            onClick={handleQRClick}
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
    </>
  )
}

export default BoughtFooter