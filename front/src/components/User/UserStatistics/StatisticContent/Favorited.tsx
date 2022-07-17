import React, { ReactElement, memo } from 'react'
import { TicketInfo } from '../../../../data/ticket_infos';

interface Props {
  tickets?: TicketInfo[];
}


const Favorited: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <article className='mb-40 mt-10'>
      {props.tickets
        ? <>
            {/* <TicketList tickets={props.tickets}/> */}
            <div className='stat-null'>Coming soon!</div>
          </>
        : <div className='stat-null'>You haven’t bought any ticket yet.</div>
      }
    </article>
  )
}

export default memo(Favorited)