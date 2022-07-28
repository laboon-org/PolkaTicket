import React from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'


import './BuyTicket.css'

import SubHeader from '../../components/SubHeader/SubHeader'
import TicketList from '../../components/Tickets/TicketList/TicketList';
import BuyTicketContent from '../../components/BuyContent/BuyTicketContent';

import tickets from '../../data/ticket_infos';
import { TicketInfo } from '../../data/ticket_infos';

const BuyTicket: React.FC = ():React.ReactElement => {
  const isBought = true;
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (): void => {
    if (isBought)
      navigate('confirm');
    else
      navigate('add_funds');
  }
  const {id} = useParams();
  const ticket: TicketInfo | undefined = id ? tickets.find(ticket => ticket.id === parseInt(id)) : undefined;

  if (ticket) {
    return (
      <div className='wrap border-x-only relative'>
        <div className='container'>
          {/* Header */}
          <section>
            <SubHeader pageName='Buy Ticket' rootURL={`/ticket/${id}`}/>
          </section>
          {/* Ticket Overview */}
          <section className='mt-8 relative'>
            <div>
              <h6 className='buy-ticket-title'>Ticket</h6>
              <TicketList tickets={[ticket]} hideFavorite={true} />
            </div>
            <div className='absolute inset-0 z-50'></div>
          </section>
          {/* Ticket Amount */}
          <section 
            className='fixed-comp sub-footer'
          >
            <div className='footer-full-w-btn w-11/12'>
              <BuyTicketContent ticket={ticket}/>
              <button 
                type='button'
                className='primary-btn mt-6'
                onClick={handleNavigate}
              >
                Continue
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
  else return (<div>Error 404!</div>)
}

export default BuyTicket