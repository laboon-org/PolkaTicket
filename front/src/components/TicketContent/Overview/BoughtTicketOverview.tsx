import React from 'react'
import { Ticket } from '../../../data/tickets'

import TicketCategories from './OverviewItem/TicketCategories'
import TicketSum from './OverviewItem/TicketSum'
import TicketTitle from './OverviewItem/TicketTitle'

import './TicketOverview.css'

interface Props {
  ticket: Ticket;
}

const TicketOverview: React.FC<Props> = ({ticket}: Props): React.ReactElement => {
  const ticketInfo = ticket.ticket_info;
  return (
    <section className='w-full mt-6'>
      {/* <article className='text-sm font-semibold'>
        <TicketCategories categories={ticketInfo.event.category} isFull={true} />
      </article> */}
      <article className='mt-4 text-3xl font-semibold'>
        <TicketTitle name={ticketInfo.event.name} />
      </article>
      <article className='flex w-full justify-between mt-6'>
        <div className='overview-ticket-usage flex flex-col '>
          <div>
            <small className='text-gray-600 text-base'>
              #Owned by <span className='text-primaryColor'>{ticket.buyer.name}</span>
            </small>
          </div>
          <TicketSum usage={ticketInfo.ticketUsage.type} />
        </div>
      </article>
    </section>
  )
}

export default TicketOverview