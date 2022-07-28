import React from 'react'
import { useParams } from 'react-router-dom';

import SubHeader from '../../components/SubHeader/SubHeader'
import AddFundsContent from '../../components/BuyContent/AddFundsContent';

const AddFunds = () => {
  const {id} = useParams();
  return (
    <div className='wrap border-x-only'>
      <div className='container'>
        {/* Header */}
        <section>
          <SubHeader pageName='Add Funds To Purchase' rootURL={`/ticket/${id}/buy`} />
        </section>
        <section>
          <AddFundsContent />
        </section>
        {/* Footer */}
        <section className='fixed-comp sub-footer'>
          <div className='footer-full-w-btn w-11/12'>
            <button className='primary-btn'>
              Continue
            </button>
            <button className=' mt-4 secondary-btn'>
              Add funds
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AddFunds