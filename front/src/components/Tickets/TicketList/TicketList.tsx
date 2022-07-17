import React from 'react'
import { TicketInterface } from '../../../api/queries';
import { Ticket } from '../../../data/tickets'
import TicketListItem from './TicketListItem';

interface Props {
  tickets: TicketInterface[];
}

const TicketList: React.FC<Props> = ({tickets}: Props): React.ReactElement => {
  return (
    <>
      {tickets
      ?
        tickets.map(ticket => (
          <div key={ticket.id}>
            <TicketListItem ticket={ticket} />
          </div>
        ))
      :
        <div>Error: Cannot load tickets!</div>
      }
    </>
  )
}

export default TicketList