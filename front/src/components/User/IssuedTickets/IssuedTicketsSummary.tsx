import React from 'react'

import './IssuedTicketsSummary.css'

const IssuedTicketsSummary = () => {
  return (
    <div className='flex justify-between'>
      <div className='issued-ticket-summary-item'>
        <p>50K</p>
        <h6>Ticket issued</h6>
      </div>
      <div className='issued-ticket-summary-item border-2 border-solid border-gray-300 px-8 border-x-only'>
        <p>48.998K</p>
        <h6>Ticket sold</h6>
      </div>
      <div className='issued-ticket-summary-item'>
        <p>4K XTZ</p>
        <h6>Total proceeds</h6>
      </div>
    </div>
  )
}

export default IssuedTicketsSummary