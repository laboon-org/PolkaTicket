import React, { ReactElement, useContext } from 'react'
import {FaRegCalendarCheck} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {FaUser} from 'react-icons/fa'
import {TbTicket} from 'react-icons/tb'

import { formatDateFull } from '../../../util/FormatDateFull'

import './TicketDetails.css'
import { TicketInfo } from '../../../data/ticket_infos'
import { TicketInterface } from '../../../api/queries';
import { AccountContext } from '../../../context/AccountData'

interface Props {
  ticket: TicketInterface;
}


const TicketDetails: React.FC<Props> = ({ticket}: Props): ReactElement => {
  const userData = useContext(AccountContext)

  return (
    <>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <TbTicket />
          </i>
        </div>
        <div className='detail-info'>
          {/* <div>
            <h6>Start Date: {formatDateFull(new Date(ticket.event.startDate)).date}</h6>
            <p>{formatDateFull(new Date(ticket.event.startDate)).time}</p>
          </div>
          <div className='mt-2'>
            <h6>End Date: {formatDateFull(new Date(ticket.event.endDate)).date}</h6>
            <p>{formatDateFull(new Date(ticket.event.endDate)).time}</p>
          </div> */}
          <h6>Ticket Type </h6>
            <p>{ticket.ticketType === 1 ? "One time usage" : "Multi time usage"}</p>
        </div>
      </article>
      {/* <article className='detail-item'>
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
      </article> */}
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <FaUser />
          </i>
        </div>
        <div className='detail-info'>
          {/* <div>
            <h6>Ticket Issuer</h6>
            <p>{ticket.event.owner}</p>
          </div> */}
          <div>
            <h6>Ticket Approver(s)</h6>
            <p>{userData.account.user}</p>
          </div>
        </div>
      </article>
      
    </>
    
    
  )
}

export default TicketDetails