import React, { ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import TicketSliderItem from './TicketSliderItem';
import { TicketCollection } from '../../../api/queries';



interface Props {
  ticketCollections: TicketCollection[];
}

const TicketSlider:React.FC<Props> = (props: Props): ReactElement => {
  return (
      <div id="ticket-slider-wrap">
        <Swiper
            slidesPerView={1.5}
            centeredSlides={true}
            rewind={true}
            spaceBetween={15}
          >
            {props.ticketCollections && props.ticketCollections.map(ticketCollection => (
              <SwiperSlide key={ticketCollection.id} >
                <TicketSliderItem ticketCollection={ticketCollection} />
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
  )
}

export default TicketSlider
