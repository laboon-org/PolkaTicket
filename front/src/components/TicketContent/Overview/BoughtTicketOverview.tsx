import React from 'react'
import { Ticket } from '../../../data/tickets'

import TicketCategories from './OverviewItem/TicketCategories'
import TicketSum from './OverviewItem/TicketSum'
import TicketTitle from './OverviewItem/TicketTitle'

import './TicketOverview.css'
import { TicketInterface } from '../../../api/queries';

interface Props {
  ticket: TicketInterface;
}

const TicketOverview: React.FC<Props> = ({ticket}: Props): React.ReactElement => {
  return (
    <section className='w-full mt-6'>
      <article className='text-sm font-semibold'>
        <TicketCategories categories={ticket.event.eventCategories} isFull={true} />
      </article>
      <article className='mt-4 text-3xl font-semibold'>
        <TicketTitle name={ticket.event.name} />
      </article>
      <article className='flex w-full justify-between mt-6'>
        <div className='overview-ticket-usage flex flex-col '>
          <div>
            <small className='text-gray-600 text-base'>
              #Owned by <span className='text-primaryColor'>{ticket.ticketOwner}</span>
            </small>
          </div>
        </div>
      </article>
    </section>
  )
}

export default TicketOverview