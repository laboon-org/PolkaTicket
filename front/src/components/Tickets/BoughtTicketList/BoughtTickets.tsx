import React from 'react'
import { TicketInterface } from '../../../api/queries';
import { Ticket } from '../../../data/tickets'
import BoughtTicketsItem from './BoughtTicketsItem';

interface Props {
  tickets: TicketInterface[];
}

const BoughtTickets: React.FC<Props> = ({tickets}: Props): React.ReactElement => {
  return (
    <>
      {tickets
      ?
        tickets.map(ticket => (
          <div key={ticket.id}>
            <BoughtTicketsItem ticket={ticket} />
          </div>
        ))
      :
        <div>Error: Cannot load tickets!</div>
      }
    </>
  )
}

export default BoughtTickets