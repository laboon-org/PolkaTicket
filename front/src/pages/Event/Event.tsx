import React, { useState } from 'react'

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ModalUser from '../../components/Header/ModalUser';

import './Event.css'

import EventList from "../../components/Event/EventList"
import events from '../../data/events';
import ModalWallet from '../../components/Header/ModalWallet';

const IssuingTicket = () => {
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [isUserModal, setUserModal] = useState<boolean>(false);

  return (
    <div className='event-content wrap border-x-only relative'>
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal} />
      )}
      <section id="header" className='fixed-comp fixed top-0 py-6'>
        <div className='w-11/12'>
          <Header setWalletModal={setWalletModal} setUserModal={setUserModal} />
        </div>
      </section>

      <div className='container'>
        <section className='relative mt-28'>
          <div>
            <EventList events={events} />
          </div>

        </section>
        <section className='mt-6 flex flex-col flex-1'>
        </section>
      </div>

      <section
        className='fixed-comp fixed bottom-0 pt-4 pb-3 border-t 
        border-solid border-gray-300 rounded-t-3xl'
      >
        <div className='w-11/12'>
          <Footer activePage='event' />
        </div>
      </section>
    </div>
  )
}

export default IssuingTicket