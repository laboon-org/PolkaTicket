import React, { useState } from 'react'

import { useGlobalExit } from '../../util/GlobalExit';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserInfo from '../../components/User/UserInfo/UserInfo';
import StatisticContent from '../../components/User/UserStatistics/StatisticContent';
import StatisticHeader from '../../components/User/UserStatistics/StatisticHeader';

import tickets from '../../data/tickets';
import ticketsInfo from '../../data/ticket_infos';
import events from '../../data/events';
import Disconnect from '../../components/DisconnectModal/DisconnectModal';


const User = () => {
  const [statType, setStatType] = useState('issued');
  const [isWalletModal, setWalletModal] = useState(false);
  const [isUserModal, setUserModal] = useState(false);

  return (
    <div className='wrap border-x-only relative'>
      <div className='container relative'>
        {/* Header */}
        <section id="header" className='fixed-comp fixed top-0 py-6'>
          <div className='w-11/12'>
            <Header isUserPage={true} setWalletModal={setWalletModal} setUserModal={setUserModal} />
          </div>
        </section>
        {/* User Info */}
        <section id="user-info" className='flex flex-col items-center mt-24'>
          <UserInfo />
        </section>
        {/* User Statistics */}
        <section className='mt-6'>
          <StatisticHeader 
            statType={statType} 
            setStatType={setStatType} 
            issuedEvent={events}
            boughtTickets={tickets}
            favoritedTickets={ticketsInfo}
          />
          <StatisticContent statType={statType} tickets={ticketsInfo} events={events} boughtTickets={tickets}/>
        </section>
        {/* Footer */}
        <section 
          id="footer" 
          className='fixed-comp fixed bottom-0 pt-4 pb-3 
          border-t border-solid border-gray-300 rounded-t-3xl'
        >
          <div className='w-11/12'>
            <Footer activePage='user' />
          </div>
        </section>
      </div>
    </div>
  )
}

export default User