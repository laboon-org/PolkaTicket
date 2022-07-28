import React, { ReactElement } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import CategorySlider from '../CategorySlider/CategorySlider';
import TicketSlider from '../Tickets/TicketSlider/TicketSlider';
import ticketsInfo from '../../data/ticket_infos';
import { TicketCollection } from '../../api/queries';
import ErrorPage from '../Error/Error';

interface Props {
  type: string;
  ticketCollections: TicketCollection[] | undefined;
}

const Content: React.FC<Props> = (props: Props): ReactElement => {
  console.log(props.ticketCollections)
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (type: string):void => {
    navigate(`/tickets/${type.toLowerCase().replace(/\s/g, "_")}`, {state: {type: props.type}})
  }

  return (
    <>
      {props.ticketCollections &&
        <section id="home-content" className='mt-8'>
          <article className='w-full flex justify-between'>
            <p className='font-semibold text-lg'>{props.type}</p>
            <button 
              className='text-primaryColor opacity-80 hover:opacity-100 focus:opacity-100'
              onClick={() => handleNavigate(props.type)}
            >
              See all
            </button>
          </article>
          {/* Categories slider */}
          {props.type === "Categories" 
          ? (
            <>
              <article className='mt-4'>
                <CategorySlider />
              </article>
              <article id="tickets" className='mt-4'>
                <TicketSlider ticketCollections={props.ticketCollections}/>
              </article>
            </>
            )
          : props.type === "Newest Event" 
            ? (
              <article id="tickets" className='mt-4'>
                <TicketSlider ticketCollections={props.ticketCollections}/>
              </article>
              )
            : props.type === "Expiring Soon" 
              ? (
                <article id="tickets" className='mt-4'>
                  <TicketSlider ticketCollections={props.ticketCollections}/>
                </article>
                )
              :
                <ErrorPage /> }
          
        </section>
      }
      
    </>
  )
}

export default Content