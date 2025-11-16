import React, { ReactElement } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {FaRegCalendarCheck} from 'react-icons/fa'
import {GrLocation} from 'react-icons/gr'



import TicketTitle from '../../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../../TicketContent/Overview/OverviewItem/TicketCategories';
import { formatDateShort } from '../../../../util/FormatDateShort';
import { Event } from '../../../../data/events';

interface Props {
  events?: Event[];
}

const Issued: React.FC<Props> = (props: Props): ReactElement => {
  const navigate: NavigateFunction = useNavigate()
  const handleNavigate = (url: string) => {
    navigate(url);
  }
  return (
    <article className='mb-40 mt-10'>
      {props.events
        ?
        props.events.map(event => (
          <div 
            key={event.id} 
            className='ticket-border flex w-full h-52 mt-4 cursor-pointer 
            hover:opacity-80 hover:bg-gray-50'
            onClick={() => handleNavigate(`issued_tickets/${event.id}`)}
          >
            {/* Ticket Image */}
            <div 
              className='w-2/5 relative'
            >
              <img 
                src={event.image} 
                alt={event.name} 
                className="object-cover object-center h-full w-full select-none" 
              />
            </div>
            <div className='w-3/5 '>
              {/* Event Info */}
              <div className='w-10/12 mx-auto flex flex-col h-full'>
                {/* Event Name */}
                <div 
                  className='overview-title mt-4 w-full text-xl font-semibold select-none' 
                >
                  <TicketTitle name={event.name}/>
                </div>
                {/* Ticket Category */}
                <div className='flex justify-between items-center mt-2'>
                  {/* <div className='text-xs font-semibold'>
                    <TicketCategories categories={event.category} />
                  </div> */}
                </div>
                {/* Tickets Summary */}
                <div className='flex flex-col flex-1 justify-end mb-2'>
                  {/* Date */}
                  <div className='issued-event-details'>
                    <i><FaRegCalendarCheck /></i>
                    <div>
                      <p>Start: {formatDateShort(event.start_date)}, {event.start_date.getFullYear()}</p>
                      <p>End: {formatDateShort(event.end_date)}, {event.end_date.getFullYear()}</p>
                    </div>
                  </div>
                  {/* Location */}
                  <div className='issued-event-details'>
                    <i><GrLocation /></i>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        :
        <div className='stat-null'>You haven’t issued any event yet.</div>
      }
    </article>
  )
}

export default Issued