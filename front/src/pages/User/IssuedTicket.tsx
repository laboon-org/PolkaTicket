import React from 'react'
import { useParams } from 'react-router-dom'

import TicketHeader from '../../components/TicketContent/TicketHeader/TicketHeader';
import TicketOverview from '../../components/TicketContent/Overview/TicketOverview';
import TicketDetails from '../../components/TicketContent/Details/TicketDetails';
import BuyFooter from '../../components/TicketContent/TicketFooter/BuyFooter';

import tickets, { TicketInfo } from '../../data/ticket_infos';

const Ticket: React.FC = (): React.ReactElement => {
  const {id} = useParams();
  const ticket: TicketInfo | undefined = id ? tickets.find(ticket => ticket.id === parseInt(id)) : undefined;
  if (ticket) {
    return (
      <div className='wrap border-x-only'>
        <TicketHeader image={ticket.event.image} rootURL="/user"/>
        <div className='container relative'>
          {/* Ticket Overview */}
            <TicketOverview ticket={ticket} />
          {/* Ticket Details */}
          <section className='w-full mt-10 border-t border-solid border-gray-100 mb-32'>
            <TicketDetails ticket={ticket} />
          </section>
        </div>
      </div>
    )
  }
  else {
    return <div>Error 404!</div>
  }
}

export default Ticket