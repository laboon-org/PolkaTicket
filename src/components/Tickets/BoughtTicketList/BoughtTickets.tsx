import React from 'react'
import { Ticket } from '../../../data/tickets'
import BoughtTicketsItem from './BoughtTicketsItem';

interface Props {
  tickets: Ticket[];
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
        <div>Error 404!</div>
      }
    </>
  )
}

export default BoughtTickets