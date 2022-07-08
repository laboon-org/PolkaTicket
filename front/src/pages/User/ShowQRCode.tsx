import React from 'react'
import SubHeader from '../../components/SubHeader/SubHeader'
import { useParams } from 'react-router-dom';

import tickets, { Ticket } from '../../data/tickets';

const ShowQRCode = () => {
  const {id} = useParams();
  const ticket: Ticket | undefined = id ? tickets.find(ticket => ticket.id === parseInt(id)) : undefined;
  return (
    <>
    {ticket
    ?
      <>
        <div className='wrap border-x-only'>
        <section className='container'>
          <SubHeader pageName="QR Code" rootURL={`/user/bought_ticket/${id}`} />
          <div className='mt-24'>
            <div className='text-center w-3/4 mx-auto'>
              <p className='font-semibold'>Please use this QR Code to join event.</p>
            </div>
            <div className='w-3/5 mx-auto mt-10'>
              <img src={ticket.qr_code} alt="QR Code" />
            </div>
          </div>
        </section>
      </div>
      </>
    :
      <div>Error 404!</div>
    }
    </>
  )
}

export default ShowQRCode