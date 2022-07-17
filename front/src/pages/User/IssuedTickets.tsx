import React, { useContext, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import SubHeader from '../../components/SubHeader/SubHeader';
import IssuedTicketsSummary from '../../components/User/IssuedTickets/IssuedTicketsSummary';
import UserInfomation from '../../components/User/UserInfo/UserInfo';

import { UserInfo } from '../../context/CurrentUser';
import { useQuery } from '@apollo/client';
import { EventType, getEventByIDAndOwner } from '../../api/queries';
import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/Error/Error';
import { AccountContext } from '../../context/AccountData';


const IssuedTickets: React.FC = (): React.ReactElement => {
  const userData = useContext(AccountContext)

  const [specificEvent, setSpecificEvent] = useState<EventType[]>([])
  const {id, userName} = useParams();
  // const userData = localStorage.getItem('user');
  // const user = userData && JSON.parse(userData)

  const { loading, error, data } = useQuery(getEventByIDAndOwner, {
    variables: {
      eventID: (id && parseInt(id)),
      userName: userName,
    },
    skip: id === undefined,
    onCompleted: (data) => {
      setSpecificEvent(data.events);
    },
    fetchPolicy: "no-cache"
  });
  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorPage />
  }

  if (data) {
    console.log("data: ", data);
  }
  
  return (
    <>
      {specificEvent.length > 0
      ?
      <>
        <div className='wrap border-x-only relative'>
          <div className='container relative'>
            {/* Header */}
            <SubHeader pageName={`Issued tickets of ${specificEvent[0].name}` } rootURL={'/user'}/>
            {/* User Info */}
            <section id="user-info" className='flex flex-col items-center mt-10'>
              <UserInfomation user={userData.account}/>
            </section>
            {/* Issued event summary */}
            <section className='mt-10'> 
              <IssuedTicketsSummary />
            </section>
            <section className=' mt-10 mb-32'>
              <p className='font-semibold text-lg'>Avaiable: {specificEvent[0].ticketToken.length}</p>
              
            </section>
            <section 
              id="footer" 
              className='fixed-comp fixed bottom-0 pt-4 pb-3 
              border-t border-solid border-gray-300 rounded-t-3xl'
            >
              <div className='w-11/12'>
                <Footer activePage='user' />
              </div>
            </section>
          </div>
        </div>
      </>
      :
      <ErrorPage /> 
      }
    </>
  )
}

export default IssuedTickets