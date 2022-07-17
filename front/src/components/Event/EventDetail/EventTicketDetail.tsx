import React, { ReactElement, useContext, useState } from 'react'
import ICON_TOTAL from '../../../assets/images/total-icon.png'
import ICON_BOUGHT from '../../../assets/images/bought-icon.png'
import TicketList from '../../Tickets/TicketList/TicketList';
import { getAvaiableTicketsByEvent, TicketInterface } from '../../../api/queries';
import { useQuery } from '@apollo/client';
import { AccountContext } from '../../../context/AccountData';
interface Props{
  id: number
  total: number
  bought: number
}
const EventAnalyseDetail: React.FC<Props> = ({id, total, bought}:Props): ReactElement => {
  const userData = useContext(AccountContext)

  const [tickets, setTickets] = useState<TicketInterface[]>([]);

  useQuery(getAvaiableTicketsByEvent, {
    variables: {
      ownerName: userData.account.user,
      eventID: id,
    },
    fetchPolicy: "no-cache",
    // skip: event === undefined,
    onCompleted: (result) => {
      setTickets(result.tickets);
    }
  });
  
  return (
    <>
      <div className='event-detail-ticket w-full'>
        <div className='total-event p-3'>
          <div className='flex justify-between'>
            <div className='flex primaryColor-icon font-semibold'>
              <img className='mr-1 self-center	' src={ICON_TOTAL} alt="total" />
              ToTal
            </div>
            <div>
              {total} Tickets
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex primaryColor-icon font-semibold'>
              <img className='mr-1 self-center' src={ICON_BOUGHT} alt="total" />
              Bought
            </div>
            <div>
              {bought} Tickets
            </div>
          </div>
        </div>
        <TicketList tickets={tickets} />
      </div>
    </>
  )
}

export default EventAnalyseDetail