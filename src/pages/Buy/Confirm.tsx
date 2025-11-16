import React from 'react'
import { NavigateFunction, useParams, useNavigate } from 'react-router-dom';
import ConfirmContent from '../../components/BuyContent/ConfirmContent';
import SubHeader from '../../components/SubHeader/SubHeader';

const Confirm = () => {
  const {id} = useParams();
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  }
  return (
    <div className='wrap border-x-only'>
      <div className='container'>
        {/* Header */}
        <section>
          <SubHeader pageName='Confirm' rootURL={`/ticket/${id}/buy`} />
        </section>
        <section>
          <ConfirmContent />
        </section>
        {/* Footer */}
        <section className='fixed-comp sub-footer'>
          <div className='footer-full-w-btn w-11/12'>
            <button className='primary-btn'>
              Confirm
            </button>
            <button className=' mt-4 secondary-btn' onClick={() => handleNavigate('/home')}>
              Cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Confirm