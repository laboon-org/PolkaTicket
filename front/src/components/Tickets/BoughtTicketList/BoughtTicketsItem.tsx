import React from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import TicketPrice from '../../TicketContent/Overview/OverviewItem/TicketPrice';
import TicketUsedSign from '../../TicketContent/Overview/OverviewItem/TicketUsedSign';
import { Ticket } from '../../../data/tickets';
import { TicketInterface } from '../../../api/queries';



interface Props {
  ticket: TicketInterface;
  hideSum?: boolean;
}

const BoughtTicketsItem: React.FC<Props> = ({ticket, hideSum}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  
  const handleNavigate = (id: number): void => {
    navigate(`bought_ticket/${id}`);
  }
  return (
    <div 
      className='ticket-border flex w-full h-56 mt-4 cursor-pointer hover:opacity-80 hover:bg-gray-50'
      onClick={() => handleNavigate(ticket.id)}
    >
      {/* Ticket Image */}
      <div 
        className='w-2/5 relative'
      >
        <img 
          src={ticket.event.image} 
          alt={ticket.event.name} 
          className="object-cover object-center h-full w-full select-none" 
        />
        <div className='absolute top-0 right-0 flex flex-col mt-1'>
          <TicketDate start={new Date(ticket.event.startDate)} end={new Date(ticket.event.endDate)} />
        </div>
      </div>
      <div className='w-3/5'>
        {/* Ticket Info */}
        <div className='w-10/12 h-full mx-auto flex flex-col'>
          {/* Ticket Name */}
          <div 
            className='overview-title mt-4 w-full text-xl font-semibold select-none' 
            
          >
            <TicketTitle name={ticket.event.name}/>
          </div>
          {/* Ticket Category & Price */}
          <div className='flex justify-between items-center mt-2'>
            {/* Category */}
            <div className='text-xs font-semibold'>
              <TicketCategories categories={ticket.event.eventCategories} />
            </div>
            {/* Price */}
            <div className='text-lg font-bold'>
              <TicketPrice price={ticket.price}/>
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
                  <TicketSum location={ticket.event.location} ticketTypeList={[ticket.ticketType]} />
              </div>
              }
            </div>
            {/* Used */}
            {ticket.status === 0 && (
              <div><TicketUsedSign /></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoughtTicketsItem