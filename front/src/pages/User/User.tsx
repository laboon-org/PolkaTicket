import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserInfomation from '../../components/User/UserInfo/UserInfo';
import StatisticContent from '../../components/User/UserStatistics/StatisticContent';
import StatisticHeader from '../../components/User/UserStatistics/StatisticHeader';

import ticketsInfo from '../../data/ticket_infos';
import { useQuery } from '@apollo/client';

import { UserInfo } from '../../context/CurrentUser';
import { EventType, getEventsByUser, getBoughtTicketsByOwner, TicketInterface } from '../../api/queries';
import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/Error/Error';
import { AccountContext } from '../../context/AccountData';



const User = () => {
  const userData = useContext(AccountContext)

  const {userName} = useParams()
  const [statType, setStatType] = useState('issued');
  const [issuedEvents, setIssuedEvents] = useState<EventType[] | undefined>()
  const [boughtTickets, setBoughtTickets] = useState<TicketInterface[] | undefined>()
  // const userData = localStorage.getItem('user');
  // const user: UserInfo = userData && JSON.parse(userData);

  const { loading: loadingEvent, error: errorEvent, data: dataEvent } = useQuery(getEventsByUser, {
    variables: {
      userName: userName,
    },
    skip: userName === null,
    onCompleted: (data) => {
      setIssuedEvents(data.events);
    },
    fetchPolicy: "no-cache"
  });

  const { loading: loadingBought, error: errorBought, data: dataBought } = useQuery(getBoughtTicketsByOwner, {
    variables: {
      ownerName: userName,
    },
    skip: userName === null,
    onCompleted: (data) => {
      setBoughtTickets(data.tickets);
    },
    fetchPolicy: "no-cache"
  });

  if (loadingEvent || loadingBought) return <Loading />;

  if (errorEvent || errorBought) {
    console.log(errorEvent);
    return <ErrorPage />
  }

  if (userName !== userName) return <ErrorPage />

  return (
    <>
      {userData && issuedEvents && boughtTickets &&
        <div className='wrap border-x-only relative'>
          <div className='container relative'>
            {/* Header */}
            <section id="header" className='fixed-comp fixed top-0 py-6'>
              <div className='w-11/12'>
                <Header isUserPage={true} />
              </div>
            </section>
            {/* User Info */}
            <section id="user-info" className='flex flex-col items-center mt-24'>
              <UserInfomation user={userData.account}/>
            </section>
            {/* User Statistics */}
            <section className='mt-6'>
              <StatisticHeader 
                statType={statType} 
                setStatType={setStatType} 
                issuedEventAmount={issuedEvents.length}
                boughtTicketsAmount={boughtTickets.length}
                favoritedTickets={ticketsInfo}
              />
              <StatisticContent 
                statType={statType} 
                tickets={ticketsInfo} 
                issuedEvents={issuedEvents} 
                boughtTickets={boughtTickets}/>
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
      }
    </>
  )
}

export default User