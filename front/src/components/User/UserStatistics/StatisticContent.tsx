import React, { ReactElement } from 'react'

import Issued from './StatisticContent/Issued';
import Sold from './StatisticContent/Sold';
import Bought from './StatisticContent/Bought';
import Favorited from './StatisticContent/Favorited';


import './StatisticContent.css'
import { TicketInfo } from '../../../data/ticket_infos';
import { Event } from '../../../data/events';
import { Ticket } from '../../../data/tickets';

interface Props {
  statType: string;
  tickets?: TicketInfo[];
  events?: Event[];
  boughtTickets: Ticket[];
}

const StatisticContent: React.FC<Props> = (props: Props): ReactElement => {
  if (props.statType === 'issued') {
    return (props.events ? <Issued events={props.events}/> : <Issued />)
  }
  else if (props.statType === 'sold') {
    return <Sold />
  }
  else if (props.statType === 'bought') {
    return (props.tickets ? <Bought tickets={props.boughtTickets}/> : <Bought />)
  }
  else if (props.statType === 'favorited') {
    return (props.tickets ? <Favorited tickets={props.tickets}/> : <Favorited />)
  }
  else return (
    <div>Error 404!</div>
  )
}
export default StatisticContent
