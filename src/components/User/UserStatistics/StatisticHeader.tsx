import React, { ReactElement } from 'react'

import './StatisticHeader.css'
import { TicketInfo } from '../../../data/ticket_infos';
import {Event} from '../../../data/events'
import { Ticket } from '../../../data/tickets';

interface Props {
  statType: string,
  setStatType: React.Dispatch<React.SetStateAction<string>>;
  issuedEvent?: Event[];
  boughtTickets?: Ticket[];
  favoritedTickets?: TicketInfo[];
}

const StatisticHeader: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <article className='statistic-header flex justify-between text-sm'>
        <button 
          className={props.statType === 'issued' ? 'active' : ''}
          onClick={() => props.setStatType('issued')}
        >
          Issued
          <span>{props.issuedEvent ? props.issuedEvent.length : 0}</span>
        </button>
        <button
          className={props.statType === 'sold' ? 'active' : ''}
          onClick={() => props.setStatType('sold')}
        >
          Sold
          <span>12K</span>
        </button>
        <button
          className={props.statType === 'bought' ? 'active' : ''}
          onClick={() => props.setStatType('bought')}
        >
          Bought
          <span>{props.boughtTickets ? props.boughtTickets.length : 0}</span>
        </button>
        <button
          className={props.statType === 'favorited' ? 'active' : ''}
          onClick={() => props.setStatType('favorited')}
        >
          Favorited
          <span>{props.favoritedTickets ? props.favoritedTickets.length : 0}</span>
        </button>
      </article>
    </>
  )
}

export default StatisticHeader