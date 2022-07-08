import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'


import TicketHeader from '../../components/TicketContent/TicketHeader/TicketHeader';
import TicketDetails from '../../components/TicketContent/Details/TicketDetails';
import BoughtFooter from '../../components/TicketContent/TicketFooter/BoughtFooter';
import BoughtTicketOverview from '../../components/TicketContent/Overview/BoughtTicketOverview';

import tickets, { Ticket } from '../../data/tickets';

const BoughtTicket: React.FC = (): ReactElement => {
  const {id} = useParams();
  const ticket: Ticket | undefined = id ? tickets.find(ticket => ticket.id === parseInt(id)) : undefined;
  if (ticket) {
    return (
      <div className='wrap border-x-only'>
        <TicketHeader image={ticket.ticket_info.event.image} rootURL="/user"/>
        <div className='container relative'>
          {/* Ticket Overview */}
            <BoughtTicketOverview ticket={ticket}/>
          {/* Ticket Details */}
          <section className='w-full mt-10 border-t border-solid border-gray-100 mb-52'>
            <TicketDetails ticket={ticket.ticket_info} />
          </section>
          <BoughtFooter />
        </div>
      </div>
    )
  }
  else {
    return <div>Error 404!</div>
  }
}

export default BoughtTicket
