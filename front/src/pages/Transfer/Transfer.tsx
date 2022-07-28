import React, { useState } from 'react'
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';

import SubHeader from '../../components/SubHeader/SubHeader'
import TransferTicket from '../../components/TransferTicket/TransferTicket';
import tickets, { Ticket } from '../../data/tickets';


const Transfer = () => {
  const {id} = useParams();
  const ticket: Ticket | undefined = id ? tickets.find(ticket => ticket.id === parseInt(id)) : undefined;
  const [address, setAddress] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();
  const handleTransfer = (): void => {
    if (address) {
      navigate('process');
    }
  }
  return (
    <>
    {ticket
    ?
      <div className='wrap border-x-only'>
        <section className='container'>
          <SubHeader pageName="Upgrade Ticket" rootURL={`/user/bought_ticket/${id}`} />
          <div className='mt-10'>
            <TransferTicket address={address} setAddress={setAddress} />
          </div>
        </section>
        <section className='fixed-comp sub-footer'>
          <div className='footer-full-w-btn w-11/12'>
            <button 
              className={`primary-btn ${address || 'disabled-btn'}`}
              onClick={handleTransfer}
            >
              Transfer
            </button>
          </div>
        </section>
      </div>
    :
      <div>Error 404!</div>
    }
    </>
  )
}

export default Transfer