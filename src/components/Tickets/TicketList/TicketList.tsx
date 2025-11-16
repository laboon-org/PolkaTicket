import React, { ReactElement } from 'react'

import { TicketInfo } from '../../../data/ticket_infos';
import TicketListItem from './TicketListItem';

interface Props {
  tickets?: TicketInfo[];
  hideSum?: boolean;
  hideFavorite?: boolean;
  isIssuer?: boolean;
}

const TicketList: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <div id="ticket-list-wrap">
      {props.tickets 
      ? props.tickets.map(ticket => (
        <div key={ticket.id}>
          <TicketListItem ticket={ticket} hideSum={props.hideSum} hideFavorite={props.hideFavorite} isIssuer={props.isIssuer}/>
        </div>
      ))
      : <div>Error 404!</div>
    }
    </div>
  )
}

export default TicketList