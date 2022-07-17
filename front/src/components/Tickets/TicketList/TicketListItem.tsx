import React from 'react'
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import TicketPrice from '../../TicketContent/Overview/OverviewItem/TicketPrice';
import TicketUsedSign from '../../TicketContent/Overview/OverviewItem/TicketUsedSign';
import { TicketInterface } from '../../../api/queries';
import TicketFavourite from '../../TicketContent/Overview/OverviewItem/TicketFavourite';



interface Props {
  ticket: TicketInterface;
}

const TicketListItem: React.FC<Props> = ({ticket}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (id: number): void => {
    navigate(`ticket/${id}`);
  }
  return (
    <div className='ticket-border flex w-full h-44 mt-4'>
      {/* Ticket Image */}
      <div 
        className='w-2/5 relative cursor-pointer'
        onClick={() => handleNavigate(ticket.id)}
      >
        <img 
          src={ticket.image_link} 
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
            className='overview-title mt-4 w-full text-xl font-semibold select-none cursor-pointer' 
            onClick={() => handleNavigate(ticket.id)}
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
            <div className='flex items-end'>
              <TicketSum ticketTypeList={[ticket.ticketType]} />
            </div>
            {/* Used */}
            <div className='flex items-end'>
              <TicketFavourite />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketListItem