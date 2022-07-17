import React from 'react'
import SubHeader from '../../components/SubHeader/SubHeader'
import { useParams, useLocation } from 'react-router-dom';

import tickets, { Ticket } from '../../data/tickets';
import ErrorPage from '../../components/Error/Error';

interface LocationState {
  qrcode: string,
}

const ShowQRCode = () => {
  const {id, userName} = useParams();
  const userData = localStorage.getItem('user');
  const user = userData && JSON.parse(userData);
  const location = useLocation();
  const locationState = location.state as LocationState;

  if (user.name !== userName) return <ErrorPage />

  return (
    <>
    {locationState
    ?
      <>
        <div className='wrap border-x-only'>
        <section className='container'>
          <SubHeader pageName="QR Code" rootURL={`/user/${userName}/bought_ticket/${id}`} />
          <div className='mt-24 w-full'>
            <div className='text-center w-3/4 mx-auto'>
              <p className='font-semibold'>Please use this QR Code to join event.</p>
            </div>
            <div className='w-4/5 mx-auto mt-6'>
              <img src={locationState.qrcode} alt="QR Code" className="object-cover w-full"/>
            </div>
          </div>
        </section>
      </div>
      </>
    :
      <ErrorPage />
    }
    </>
  )
}

export default ShowQRCode