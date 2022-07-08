import React from 'react'

import { TicketInfo } from '../../../data/ticket_infos'
import CategorySlider from '../../CategorySlider/CategorySlider';
import TicketList from '../../Tickets/TicketList/TicketList';
import SearchNotFound from './SearchNotFound';

interface Props {
  tickets?: [] | TicketInfo[];
}

const SearchResult: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <>
      {props.tickets
      ? <>
          <article className='flex justify-between items-center'>
            <p className='font-light text-gray-800'>Search Results</p>
            <p className='font-semibold text-primaryColor'>{props.tickets.length > 0 ? props.tickets.length : 0} found</p>
          </article>
          <article className='w-full mt-4 mb-36'>
            {props.tickets.length > 0 
              ? <>
                  <div>
                    <CategorySlider />
                  </div>
                  <div className='mt-4'>
                    <TicketList tickets={props.tickets} />
                  </div>
                </> 
              : <SearchNotFound />
            }
          </article>
        </>
      : <div><SearchNotFound /></div>
      }
    </>
  ) 
}

export default SearchResult