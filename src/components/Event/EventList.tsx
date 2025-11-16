import React, { ReactElement } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr'
import { AiFillPlusCircle } from 'react-icons/ai'

import EventNotFound from './EventNotFound';
import IMG_ADD_EVENT from '../../assets/images/add-event-img.png'
import TicketTitle from '../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from './EventCategories';
import { Event } from '../../data/events';

interface Props {
  events?: Event[];
}

const Issued: React.FC<Props> = (props: Props): ReactElement => {
  const navigate: NavigateFunction = useNavigate()

  const handleNavigate = (url: string) => {
    navigate(url);
  }

  const handleCreateEvent = () => {
    navigate('/event/create_event')
  }
  return (
    <article className='mb-40'>

      {props.events
        ?
        <>
          <div className='w-full flex justify-end z-40'>
            <button type='button' onClick={handleCreateEvent} className="event-add-btn">
              <p className='ml-4 mr-2 text-primaryColor font-semibold text-lg'>Add event</p>
              <i className='text-primaryColor'><AiFillPlusCircle /></i>
            </button>
          </div>
          {
            props.events.map(event => (
              <div
                key={event.id}
                className='list-event event-border flex w-full flex-col h-80 mt-4 cursor-pointer 
                  hover:opacity-80 hover:bg-gray-50'
                onClick={() => handleNavigate(`/event/${event.id}`)}
              >
                {/* Ticket Image */}
                <div
                  className='h-4/6 relative'
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="object-cover object-center h-full w-full select-none"
                  />
                </div>
                <div className='h-2/5 '>
                  {/* Event Info */}
                  <div className='w-11/12 mx-auto flex flex-col h-full'>
                    {/* Event Name */}
                    <div className='flex'>
                      <div
                        className='overview-title mt-4 w-full text-xl font-semibold select-none'
                      >
                        <TicketTitle name={event.name} />
                      </div>
                      <div className='flex justify-between items-center mt-2'>
                        {/* <div className='text-xs font-semibold'>
                          <TicketCategories categories={event.category} />
                        </div> */}
                      </div>
                    </div>
                    {/* Location */}
                    <div className='flex flex-1 items-center mb-2 flex'>
                      <div className='issued-event-details'>
                        <i><GrLocation /></i>
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </>
        :
        <EventNotFound redirect={handleCreateEvent}/>
      }
    </article>
  )
}

export default Issued