import React, { ReactElement } from 'react'

import Issued from './StatisticContent/Issued';
import Sold from './StatisticContent/Sold';
import Bought from './StatisticContent/Bought';
import Favorited from './StatisticContent/Favorited';


import './StatisticContent.css'
import { TicketInfo } from '../../../data/ticket_infos';
import { EventType, TicketInterface } from '../../../api/queries';

interface Props {
  statType: string;
  tickets?: TicketInfo[];
  issuedEvents: EventType[];
  boughtTickets?: TicketInterface[];
}

const StatisticContent: React.FC<Props> = (props: Props): ReactElement => {
  if (props.statType === 'issued') {
    return (props.issuedEvents.length > 0 ? <Issued events={props.issuedEvents}/> : <Issued />)
  }
  else if (props.statType === 'sold') {
    return <Sold />
  }
  else if (props.statType === 'bought') {
    return (props.boughtTickets ? <Bought tickets={props.boughtTickets}/> : <Bought />)
  }
  else if (props.statType === 'favorited') {
    return (props.tickets ? <Favorited tickets={props.tickets}/> : <Favorited />)
  }
  else return (
    <div>Error!</div>
  )
}
export default StatisticContent
