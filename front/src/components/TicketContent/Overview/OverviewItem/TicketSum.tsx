import React, { ReactElement, memo } from 'react'

import {IoLocationSharp} from 'react-icons/io5'
import { TbTicket } from 'react-icons/tb'

import './OverviewItem.css'


interface Props {
  location?: string,
  ticketTypeList?: number[],
}

const TicketSum: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <div className='select-none flex flex-col justify-end'>
      {props.location && (
        <div className='ticket-sum'>
          <i><IoLocationSharp /></i>
          <p className='ticket-sum-location'>{props.location}</p>
        </div>
      )}
      {props.ticketTypeList && (
        <div className='ticket-sum'>
          <i><TbTicket /></i>
          <div>
            {props.ticketTypeList.map((usage, index) => (
              <div key={index} className="flex flex-col justify-end">
                <p>{usage === 1 ? "One time usage" : "Multi time usage"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(TicketSum)