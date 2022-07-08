import { Event } from './events'
import { TicketType } from './ticket_types'
import events from './events'
import ticketTypes from './ticket_types'

import IMG_EVENT from '../assets/images/event-bg-1.png'
import IMG_EVENT2 from '../assets/images/event-2-img.jpg'
import IMG_EVENT3 from '../assets/images/event-3-img.jpg'
import IMG_EVENT4 from '../assets/images/event-4-img.jpg'
import IMG_EVENT5 from '../assets/images/event-5-img.webp'
import IMG_EVENT6 from '../assets/images/event-6-img.jpg'
import IMG_EVENT7 from '../assets/images/event-7-img.jpg'
import IMG_EVENT8 from '../assets/images/event-8-img.jpg'
import IMG_EVENT9 from '../assets/images/event-9-img.jpg'
import IMG_EVENT10 from '../assets/images/event-10-img.webp'
import IMG_EVENT11 from '../assets/images/event-11-img.jpg'

const getEvent = (id: number): Event => {
  const targetEvent = events.find(event => event.id === id);
  if (targetEvent) return targetEvent;
  return {
    id: 0,
    name: '',
    image: '',
    location: '',
    start_date: new Date(),
    end_date: new Date(),
    category: [{id: 0, name: ''}],
  };
}

const getTicketType = (id: number): TicketType => {
  const targetType = ticketTypes.find(type => type.id === id);
  if (targetType) return targetType;
  return {
    id: 0,
    type: '',
  };
}

export interface TicketInfo {
  id: number, 
  event: Event, 
  image: string,
  ticketPrice: number, 
  totalTicket: number,
  ticketUsage: TicketType,
}

const ticketInfos: TicketInfo[] = [
  {
    id: 1,
    event: getEvent(1),
    image: IMG_EVENT,
    ticketPrice: 70,
    totalTicket: 50000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 2,
    event: getEvent(2),
    image: IMG_EVENT2,
    ticketPrice: 700,
    totalTicket: 43000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 3,
    event: getEvent(2),
    image: IMG_EVENT2,
    ticketPrice: 1000,
    totalTicket: 7000,
    ticketUsage: getTicketType(2),
  },
  {
    id: 4,
    event: getEvent(3),
    image: IMG_EVENT3,
    ticketPrice: 60,
    totalTicket: 3000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 5,
    event: getEvent(4),
    image: IMG_EVENT4,
    ticketPrice: 100,
    totalTicket: 1000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 6,
    event: getEvent(5),
    image: IMG_EVENT5,
    ticketPrice: 200,
    totalTicket: 50000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 7,
    event: getEvent(5),
    image: IMG_EVENT5,
    ticketPrice: 500,
    totalTicket: 10000,
    ticketUsage: getTicketType(2),
  },
  {
    id: 8,
    event: getEvent(6),
    image: IMG_EVENT6,
    ticketPrice: 50,
    totalTicket: 500,
    ticketUsage: getTicketType(1),
  },
  {
    id: 9,
    event: getEvent(6),
    image: IMG_EVENT6,
    ticketPrice: 100,
    totalTicket: 500,
    ticketUsage: getTicketType(2),
  },
  {
    id: 10,
    event: getEvent(7),
    image: IMG_EVENT7,
    ticketPrice: 250,
    totalTicket: 10000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 11,
    event: getEvent(8),
    image: IMG_EVENT8,
    ticketPrice: 70,
    totalTicket: 50000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 12,
    event: getEvent(9),
    image: IMG_EVENT9,
    ticketPrice: 300,
    totalTicket: 50000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 14,
    event: getEvent(9),
    image: IMG_EVENT9,
    ticketPrice: 300,
    totalTicket: 50000,
    ticketUsage: getTicketType(2),
  },
  {
    id: 15,
    event: getEvent(10),
    image: IMG_EVENT10,
    ticketPrice: 120,
    totalTicket: 50000,
    ticketUsage: getTicketType(1),
  },
  {
    id: 16,
    event: getEvent(11),
    image: IMG_EVENT11,
    ticketPrice: 300,
    totalTicket: 50000,
    ticketUsage: getTicketType(1),
  },
]


export default ticketInfos