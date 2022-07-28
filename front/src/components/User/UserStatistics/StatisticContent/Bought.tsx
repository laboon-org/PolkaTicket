import React, { ReactElement } from 'react'
import { Ticket } from '../../../../data/tickets';
import tickets from '../../../../data/tickets';
import BoughtTickets from '../../../Tickets/BoughtTicketList/BoughtTickets';

interface Props {
  tickets?: Ticket[];
}

const Bought: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <article className='mb-40 mt-10'>
      {props.tickets
        ? <>
            <BoughtTickets tickets={tickets}/>
          </>
        : <div className='stat-null'>You haven’t bought any ticket yet.</div>
      }
    </article>
  )
}

export default Bought