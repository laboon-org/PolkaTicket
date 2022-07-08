import { TicketInfo } from './ticket_infos';
import { User } from './users';

import ticketInfos from './ticket_infos';
import users from './users';

import IMG_QR from '../assets/images/qr_code.png'

const getTicketInfo = (id: number): TicketInfo => {
  const targetTicketInfo = ticketInfos.find(info => info.id === id);
  if (targetTicketInfo) return targetTicketInfo;
  return {
    id: 0, 
    event: {
      id: 0,
      name: '',
      image: '',
      location: '',
      start_date: new Date(),
      end_date: new Date(),
      category: [{id: 0, name: ''}],
    }, 
    image: '',
    ticketPrice: 0, 
    totalTicket: 0,
    ticketUsage: {
      id: 0,
      type: '',
    },
  };
}

const getBuyer = (id: number): User => {
  const targetBuyer = users.find(user => user.id === id);
  if (targetBuyer) return targetBuyer;
  return {
    id: 0,
    name: '',
  };
}

export interface Ticket {
  id: number,
  ticket_info: TicketInfo,
  buyer: User,
  qr_code: string,
  is_used: boolean,
}

const tickets: Ticket[] =  [
  {
    id: 1,
    ticket_info: getTicketInfo(1),
    buyer:  getBuyer(1),
    qr_code: IMG_QR,
    is_used: false,
  },
  {
    id: 2,
    ticket_info: getTicketInfo(2),
    buyer:  getBuyer(1),
    qr_code: IMG_QR,
    is_used: false,
  },
  {
    id: 3,
    ticket_info: getTicketInfo(4),
    buyer:  getBuyer(1),
    qr_code: IMG_QR,
    is_used: true,
  },
  {
    id: 4,
    ticket_info: getTicketInfo(5),
    buyer:  getBuyer(1),
    qr_code: IMG_QR,
    is_used: false,
  },
  {
    id: 5,
    ticket_info: getTicketInfo(8),
    buyer:  getBuyer(1),
    qr_code: IMG_QR,
    is_used: true,
  },
]

export default tickets