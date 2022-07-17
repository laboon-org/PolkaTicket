import React from 'react'

import TicketCategories from './OverviewItem/TicketCategories'
import TicketPrice from './OverviewItem/TicketPrice'
import TicketSum from './OverviewItem/TicketSum'
import TicketTitle from './OverviewItem/TicketTitle'

import './TicketOverview.css'
import { TicketInterface } from '../../../api/queries';
import { getTicketType } from '../../../util/getTicketType'

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
      <article className='flex w-full justify-between mt-4'>
        
        <div className='w-full text-right mt-6'>
          <div className='text-3xl font-bold'>
            <TicketPrice price={ticket.price} />
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