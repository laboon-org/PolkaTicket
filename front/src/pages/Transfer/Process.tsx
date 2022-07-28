import React, { useEffect, useState } from 'react'
import ProcessingTransfer from '../../components/TransferTicket/ProcessingTransfer'
import TransferComplete from '../../components/TransferTicket/TransferComplete';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Process = () => {
  const [isTransferComplete, setTransferComplete] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransferComplete(true);
    }, 5000)
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className='wrap border-x-only'>
        <section className='container'>
          {!isTransferComplete
          ?
            <ProcessingTransfer />
          :
            <>
              <TransferComplete />
              <section 
                className='fixed-comp sub-footer'
              >
                <div className='footer-full-w-btn w-11/12'>
                  <button 
                    className='primary-btn'
                    onClick={() => handleNavigate('/home')}
                  >
                    OK
                  </button>
                </div>
              </section>
            </>
          }
        </section>
      </div>
  )
}

export default Process