import React, { ReactElement } from 'react'
import {FaRegCalendarCheck} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {FaUser} from 'react-icons/fa'

import { formatDateFull } from '../../../util/FormatDateFull'

import './TicketDetails.css'
import { TicketInfo } from '../../../data/ticket_infos'

interface Props {
  ticket: TicketInfo;
}


const TicketDetails: React.FC<Props> = ({ticket}: Props): ReactElement => {
  return (
    <>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <FaRegCalendarCheck />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Start Date: {formatDateFull(ticket.event.start_date).date}</h6>
            <p>{formatDateFull(ticket.event.start_date).time}</p>
          </div>
          <div className='mt-2'>
            <h6>End Date: {formatDateFull(ticket.event.end_date).date}</h6>
            <p>{formatDateFull(ticket.event.end_date).time}</p>
          </div>
        </div>
      </article>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <IoLocationSharp />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Location</h6>
            <p>{ticket.event.location}</p>
          </div>
        </div>
      </article>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <FaUser />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Ticket Issuer</h6>
            <p>0x0da46c783f8cxv85x6z5cxhxv12382</p>
          </div>
          <div className='mt-2'>
            <h6>Ticket Approver(s)</h6>
            <p>0x0da46c783f8cxv85x6z5cxhxv12382</p>
          </div>
        </div>
      </article>
      
    </>
    
    
  )
}

export default TicketDetails