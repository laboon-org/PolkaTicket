import React, { useContext, useState } from 'react'

import './Event.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ModalUser from '../../components/Header/ModalUser';
import EventList from "../../components/Event/EventList"
import ModalWallet from '../../components/Header/ModalWallet';

import { Event, getEventsUser } from '../../api/queries';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading/Loading';
import { AccountContext } from '../../context/AccountData';

const IssuingTicket = () => {
  const userData = useContext(AccountContext)

  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const { loading, error, data } = useQuery(getEventsUser, {
    variables:{
      wallet_address: userData.account.user
    },
    fetchPolicy: "no-cache" 
  });

  if (loading) return <Loading />;

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
            <EventList events={data.events} />
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