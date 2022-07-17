import React, { useContext } from 'react'
import { NavigateFunction, useParams, useNavigate, useLocation } from 'react-router-dom';
import { TicketInterface } from '../../api/queries';
import ConfirmContent from '../../components/BuyContent/ConfirmContent';
import ErrorPage from '../../components/Error/Error';
import SubHeader from '../../components/SubHeader/SubHeader';
import { UPDATE_TICKET_OWNER } from '../../api/mutation/updateTicketOwner';
import { useMutation } from '@apollo/client';
import LoadingModal from '../../components/BuyContent/LoadingModal';
import CompleteModal from '../../components/BuyContent/CompleteModal';
import { AccountContext } from '../../context/AccountData';

interface LocationState {
  ticket: TicketInterface
}


const Confirm = () => {
  const userData = useContext(AccountContext)

  // const userData = localStorage.getItem('user');
  // const user = userData && JSON.parse(userData);
  const {eventID, id} = useParams();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  }

  const [updateTicketOwner, { loading, error, data }] = useMutation(UPDATE_TICKET_OWNER);

  const handleBuyTicket = (): void => {
    updateTicketOwner({
      variables: {
        ticketID: id && parseInt(id),
        ownerName: userData.account.user,
      }
    })
  }

  if (loading) return <LoadingModal />

  if (error) console.log(error);

  if (data) return <CompleteModal />

  if (locationState) {
    return (
      <div className='wrap border-x-only'>
        <div className='container'>
          {/* Header */}
          <section>
            <SubHeader pageName='Confirm' rootURL="-1" />
          </section>
          <section>
            <ConfirmContent totalPrice={locationState.ticket.price} userName={userData.account.user}/>
          </section>
          {/* Footer */}
          <section className='fixed-comp sub-footer'>
            <div className='footer-full-w-btn w-11/12'>
              <button className='primary-btn' onClick={handleBuyTicket}>
                Confirm
              </button>
              <button className=' mt-4 secondary-btn' onClick={() => handleNavigate(`/active_event/${eventID}`)}>
                Cancel
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
  else return <ErrorPage />
}

export default Confirm