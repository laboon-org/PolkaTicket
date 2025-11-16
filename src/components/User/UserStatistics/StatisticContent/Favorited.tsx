import React, { ReactElement } from 'react'
import { TicketInfo } from '../../../../data/ticket_infos';
import TicketList from '../../../Tickets/TicketList/TicketList';

interface Props {
  tickets?: TicketInfo[];
}


const Favorited: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <article className='mb-40 mt-10'>
      {props.tickets
        ? <>
            <TicketList tickets={props.tickets}/>
          </>
        : <div className='stat-null'>You haven’t bought any ticket yet.</div>
      }
    </article>
  )
}

export default Favorited