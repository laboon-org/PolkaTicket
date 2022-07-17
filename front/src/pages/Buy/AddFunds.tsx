import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

import SubHeader from '../../components/SubHeader/SubHeader'
import AddFundsContent from '../../components/BuyContent/AddFundsContent';
import { TicketInterface } from '../../api/queries';
import ErrorPage from '../../components/Error/Error';

interface LocationState {
  ticket: TicketInterface,
}

const AddFunds = () => {
  const {id} = useParams();
  const location = useLocation();
  const locationState = location.state as LocationState;
  if (locationState) {
    return (
      <div className='wrap border-x-only'>
        <div className='container'>
          {/* Header */}
          <section>
            <SubHeader pageName='Add Funds To Purchase' rootURL="-1" />
          </section>
          <section>
            <AddFundsContent totalPrice={locationState.ticket.price} />
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
  else return <ErrorPage />
}

export default AddFunds