import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

import CategorySlider from '../../components/CategorySlider/CategorySlider';
import TicketList from '../../components/Tickets/TicketList/TicketList';
import SubHeader from '../../components/SubHeader/SubHeader';
import ticketsInfo from '../../data/ticket_infos';
import Error from '../../components/Error/Error';

interface Props {
  type?: string;
}

interface LocationState {
  type: string;
}

const toTitleCase = (phrase: string): string => {
  return phrase
    .replace("_", " ")
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
};
// eslint-disable-next-line
const Tickets: React.FC<Props> = (props: Props) => {
  const {type} = useParams();
  const location = useLocation();
  const locationState = location.state as LocationState;
  
  const title: string = type ? toTitleCase(type) : '';
  if (locationState) {
    return (
      <div className='wrap border-x-only'>
        <section className='container'>
          <SubHeader pageName={locationState.type} rootURL="/home" />
          {title === "Categories" && (
            <article className='w-full mt-4'>
              <CategorySlider />
            </article>
          )}
          <article className='w-full my-4'>
              <TicketList tickets={ticketsInfo}/>
          </article>
        </section>
      </div>
    )
  }
  else {
    return (
      <div><Error /></div>
    )
  }
}

export default Tickets