import React from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketFavourite from '../../TicketContent/Overview/OverviewItem/TicketFavourite';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import TicketPrice from '../../TicketContent/Overview/OverviewItem/TicketPrice';
import { TicketInfo } from '../../../data/ticket_infos';

interface Props {
  ticket: TicketInfo;
  hideSum?: boolean;
  hideFavorite?: boolean;
  showUsed?: boolean;
  isIssuer?: boolean;
}

const TicketListItem: React.FC<Props> = (props: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  
  const handleNavigate = (id: number): void => {
    if(props.isIssuer) {
      navigate(`/user/issued_ticket/${id}`);
    }
    else {
      navigate(`/ticket/${id}`);
    }
  }
  return (
    <div className='ticket-border flex w-full h-52 mt-4'>
      {/* Ticket Image */}
      <div 
        className='w-2/5 relative cursor-pointer hover:opacity-80'
        onClick={() => handleNavigate(props.ticket.id)}
      >
        <img 
          src={props.ticket.image} 
          alt={props.ticket.event.name} 
          className="object-cover object-center h-full w-full select-none" 
        />
        <div className='absolute top-0 right-0 flex flex-col mt-1'>
          <TicketDate start={props.ticket.event.start_date} end={props.ticket.event.end_date} />
        </div>
      </div>
      <div className='w-3/5'>
        {/* Ticket Info */}
        <div className='w-10/12 h-full mx-auto flex flex-col'>
          {/* Ticket Name */}
          <div 
            className='overview-title mt-4 w-full text-xl font-semibold select-none 
              cursor-pointer hover:opacity-80' 
            onClick={() => handleNavigate(props.ticket.id)}
          >
            <TicketTitle name={props.ticket.event.name}/>
          </div>
          {/* Ticket Category & Price */}
          <div className='flex justify-between items-center mt-2'>
            {/* Category */}
            {/* <div className='text-xs font-semibold'>
              <TicketCategories categories={props.ticket.event.category} />
            </div> */}
            {/* Price */}
            <div className='text-lg font-bold'>
              <TicketPrice price={props.ticket.ticketPrice}/>
            </div>
          </div>
          
          {/* Tickets Summary + Favourite */}
          <div className='flex justify-between items-end flex-1 mt-2 mb-4'>
            {/* Tickets Summary */}
            <div>
              {props.hideSum
              ? <div className='flex flex-1 items-end'>
                  
                </div>
              : <div className='flex items-end '>
                  <TicketSum location={props.ticket.event.location} usage={props.ticket.ticketUsage.type} />
              </div>
              }
            </div>
            {/* Favourite */}
            {props.hideFavorite
              ? <></>
              : <div className='flex items-end '>
                  <TicketFavourite />
              </div>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketListItem