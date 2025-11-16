import React from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import TicketPrice from '../../TicketContent/Overview/OverviewItem/TicketPrice';
import TicketUsedSign from '../../TicketContent/Overview/OverviewItem/TicketUsedSign';
import { Ticket } from '../../../data/tickets';

interface Props {
  ticket: Ticket;
  hideSum?: boolean;
}

const BoughtTicketsItem: React.FC<Props> = ({ticket, hideSum}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  
  const handleNavigate = (id: number): void => {
    navigate(`bought_ticket/${id}`);
  }
  return (
    <div 
      className='ticket-border flex w-full h-52 mt-4 cursor-pointer hover:opacity-80 hover:bg-gray-50'
      onClick={() => handleNavigate(ticket.ticket_info.id)}
    >
      {/* Ticket Image */}
      <div 
        className='w-2/5 relative'
      >
        <img 
          src={ticket.ticket_info.image} 
          alt={ticket.ticket_info.event.name} 
          className="object-cover object-center h-full w-full select-none" 
        />
        <div className='absolute top-0 right-0 flex flex-col mt-1'>
          <TicketDate start={ticket.ticket_info.event.start_date} end={ticket.ticket_info.event.end_date} />
        </div>
      </div>
      <div className='w-3/5'>
        {/* Ticket Info */}
        <div className='w-10/12 h-full mx-auto flex flex-col'>
          {/* Ticket Name */}
          <div 
            className='overview-title mt-4 w-full text-xl font-semibold select-none' 
            
          >
            <TicketTitle name={ticket.ticket_info.event.name}/>
          </div>
          {/* Ticket Category & Price */}
          <div className='flex justify-between items-center mt-2'>
            {/* Category */}
            {/* <div className='text-xs font-semibold'>
              <TicketCategories categories={ticket.ticket_info.event.category} />
            </div> */}
            {/* Price */}
            <div className='text-lg font-bold'>
              <TicketPrice price={ticket.ticket_info.ticketPrice}/>
            </div>
          </div>
          
          {/* Tickets Summary + Favourite */}
          <div className='flex justify-between items-end flex-1 mt-2 mb-4'>
            {/* Tickets Summary */}
            <div>
              {hideSum
              ? <div className='flex flex-1 items-end'>
                  
                </div>
              : <div className='flex items-end '>
                  <TicketSum location={ticket.ticket_info.event.location} usage={ticket.ticket_info.ticketUsage.type} />
              </div>
              }
            </div>
            {/* Used */}
            {ticket.is_used && (
              <div><TicketUsedSign /></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoughtTicketsItem