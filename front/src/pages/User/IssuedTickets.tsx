import React from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import SubHeader from '../../components/SubHeader/SubHeader';
import UserInfo from '../../components/User/UserInfo/UserInfo';
import IssuedTicketsSummary from '../../components/User/IssuedTickets/IssuedTicketsSummary';

import events, { Event } from '../../data/events';
import tickets, { TicketInfo } from '../../data/ticket_infos';
import TicketList from '../../components/Tickets/TicketList/TicketList';

const IssuedTickets = () => {
  const {id} = useParams();
  const event: Event | undefined = id ? events.find(event => event.id === parseInt(id)) : undefined;
  const filterTickets: TicketInfo[] = tickets.filter(ticket => ticket.event === event);
  return (
    <>
      {event
      ?
      <>
        <div className='wrap border-x-only relative'>
          <div className='container relative'>
            {/* Header */}
            <SubHeader pageName={`Issued tickets of ${event.name}` } rootURL={'/user'}/>
            {/* User Info */}
            <section id="user-info" className='flex flex-col items-center mt-10'>
              <UserInfo />
            </section>
            {/* Issued event summary */}
            <section className='mt-10'> 
              <IssuedTicketsSummary />
            </section>
            <section className=' mt-10 mb-32'>
              <p className='font-semibold text-lg'>Avaiable: 2</p>
              <TicketList tickets={filterTickets} hideFavorite={true} isIssuer={true} />
            </section>
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
      </>
      :
      <div>Error 404!</div>  
      }
    </>
  )
}

export default IssuedTickets