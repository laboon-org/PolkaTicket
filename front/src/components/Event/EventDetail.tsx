import React, { ReactElement } from 'react'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

import { formatDateFull } from '../../util/FormatDateFull'

import '../../pages/Event/Event.css'

import '../TicketContent/Details/TicketDetails.css'
import events, { Event } from '../../data/events'
import { useParams } from 'react-router-dom'
import EventHeaderDetail from './EventHeaderDetail'
import EventCategories from './EventCategories'

const EventDetail: React.FC = (): ReactElement => {
  const { id } = useParams();
  const event: Event | undefined = id ? events.find(event => event.id === parseInt(id)) : undefined;
  if (event) {
    return (
      <>
        <div className='wrap border-x-only'>
          <div className='container relative event-detail-content'>
            <EventHeaderDetail image={event.image} rootURL="/event" name={event.name}/>
            <EventCategories categories={event.category} isFull />
            <h3 className='font-semibold text-3xl mt-4'>
              {event.name}
            </h3>
            <div className='flex-1'>
              {/* time */}
              <article className='detail-item'>
                <div className='detail-icon'>
                  <i>
                    <FaRegCalendarCheck />
                  </i>
                </div>
                <div className='detail-info'>
                  <div>
                    <h6>Start Date: {formatDateFull(event.start_date).date}</h6>
                    <p>{formatDateFull(event.start_date).time}</p>
                  </div>
                  <div className='mt-2'>
                    <h6>End Date: {formatDateFull(event.end_date).date}</h6>
                    <p>{formatDateFull(event.end_date).time}</p>
                  </div>
                </div>
              </article>
              {/* location */}
              <article className='detail-item'>
                <div className='detail-icon'>
                  <i>
                    <IoLocationSharp />
                  </i>
                </div>
                <div className='detail-info'>
                  <div>
                    <h6>Location</h6>
                    <p>{event.location}</p>
                  </div>
                </div>
              </article>
            </div>

            <div className='footer-full-w-btn w-full mt-28 mb-6 m-auto'>
              <button
                type='button'
                className='primary-btn'
              >
                Issue ticket
              </button>
            </div>
          </div>
        </div>

      </>
    )
  }
  else {
    return <div>Error 404!</div>
  }
}

export default EventDetail