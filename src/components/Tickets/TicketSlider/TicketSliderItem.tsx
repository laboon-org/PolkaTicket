import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketFavourite from '../../TicketContent/Overview/OverviewItem/TicketFavourite';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import TicketPrice from '../../TicketContent/Overview/OverviewItem/TicketPrice';
import { TicketCollection } from '../../../api/queries';

interface Props {
  ticketCollection: TicketCollection;
}

const TicketSliderItem: React.FC<Props> = ({ticketCollection}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  
  const handleNavigate = (id: number): void => {
    navigate(`/ticket/${id}`);
  }
  return (
    <div className='ticket-border'>
      {/* Ticket Image */}
      <div 
        className='relative cursor-pointer hover:opacity-80' 
        onClick={() => handleNavigate(ticketCollection.id)}
      >
        <img src={ticketCollection.ticketInfo.event.image} alt={ticketCollection.ticketInfo.event.name} className='object-cover object-center h-40 w-full select-none'/>
        <div className='absolute top-0 right-0 flex mt-1 mr-1'>
          <TicketDate start={ticketCollection.ticketInfo.event.startDate} end={ticketCollection.ticketInfo.event.endDate} />
        </div>
      </div>
      {/* Ticket Info */}
      <div className='w-10/12 mx-auto'>
        {/* Ticket Name */}
        <div  
          className='overview-title mt-4 w-full text-xl font-semibold select-none 
            cursor-pointer hover:opacity-80' 
          onClick={() => handleNavigate(ticketCollection.id)}
        >
          <TicketTitle name={ticketCollection.ticketInfo.event.name}/>
        </div>
        {/* ticket Category & Price */}
        <div className='flex justify-between items-center mt-2'>
          {/* Category */}
          {/* <div className='text-xs font-semibold'>
            <TicketCategories categories={ticketCollection.ticketInfo.event.eventCategoryItems} />  
          </div> */}
          {/* Price */}
          {/* <div className='text-lg font-bold'>
            <TicketPrice price={ticket.ticketPrice}/>
          </div> */}
        </div>
        
        {/* Tickets Summary + Favourite */}
        <div className='flex justify-between items-end mb-4'>
          {/* Tickets Summary */}
          <TicketSum location={ticketCollection.ticketInfo.event.location} usage={ticketCollection.ticketInfo.ticketType.toString()}/>
          {/* Favourite */}
          <div className='flex items-end'>
            <TicketFavourite />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketSliderItem