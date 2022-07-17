import React from 'react'

import './IssuedTicketsSummary.css'

const IssuedTicketsSummary = () => {
  return (
    <div className='flex justify-between'>
      <div className='issued-ticket-summary-item'>
        <p>50K</p>
        <h6>Ticket issued</h6>
      </div>
      <div className='issued-ticket-summary-item'>
        <p>48.998K</p>
        <h6>Ticket sold</h6>
      </div>
      <div className='issued-ticket-summary-item'>
        <p>4K DEV</p>
        <h6>Total proceeds</h6>
      </div>
    </div>
  )
}

export default IssuedTicketsSummary