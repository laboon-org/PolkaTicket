import React from 'react'

import { TicketInfo } from '../../../data/ticket_infos'

import TicketCategories from './OverviewItem/TicketCategories'
import TicketPrice from './OverviewItem/TicketPrice'
import TicketSum from './OverviewItem/TicketSum'
import TicketTitle from './OverviewItem/TicketTitle'

import './TicketOverview.css'

interface Props {
  ticket: TicketInfo;
}

const TicketOverview: React.FC<Props> = ({ticket}: Props): React.ReactElement => {
  return (
    <section className='w-full mt-6'>
      {/* <article className='text-sm font-semibold'>
        <TicketCategories categories={ticket.event.category} isFull={true} />
      </article> */}
      <article className='mt-4 text-3xl font-semibold'>
        <TicketTitle name={ticket.event.name} />
      </article>
      <article className='flex w-full justify-between mt-4'>
        <div className='overview-ticket-usage flex items-center'>
          <TicketSum usage={ticket.ticketUsage.type} />
        </div>
        <div className='text-right'>
          <div className='text-3xl font-bold mt-2'>
            <TicketPrice price={ticket.ticketPrice} />
          </div>
          <div className='text-sm text-gray-600 mt-2'>
            <p>(19,564213$)</p>
          </div>
        </div>
      </article>
          </section>
  )
}

export default TicketOverview