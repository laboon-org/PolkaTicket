import React, { ReactElement } from 'react'

//import { IoBagOutline } from 'react-icons/io5'
//import { RiTicketLine } from 'react-icons/ri'
import {IoLocationSharp} from 'react-icons/io5'
import { TbTicket } from 'react-icons/tb'

import './OverviewItem.css'


interface Props {
  location?: string,
  usage: string,
}

const TicketSum: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <div className='select-none'>
        {props.location && (
          <div className='ticket-sum'>
          <i><IoLocationSharp /></i>
          <p>{props.location}</p>
        </div>
        )}
        <div className='ticket-sum'>
          <i><TbTicket /></i>
          <p>{props.usage}</p>
        </div>
      </div>
    </>
  )
}

export default TicketSum