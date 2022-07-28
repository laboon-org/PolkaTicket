import React, { LazyExoticComponent, ReactElement, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from "./api/client"

import { Exit } from './util/GlobalExit';
import './App.css'
import PrivateRouteForm from './pages/PrivateRoute/PrivateRouteForm';
import PrivateRoute from './pages/PrivateRoute';
import GlobalStyles from './components/GlobalStyles/global';
import Loading from './components/Loading/Loading'
import Login from './pages/Login/Login';
import Welcome from './pages/Welcome/Welcome';
import Error from './components/Error/Error';

import BuyTicket from './pages/Buy/BuyTicket';
import AddFunds from './pages/Buy/AddFunds';
import Confirm from './pages/Buy/Confirm';

import UserSettings from './pages/User/Settings';
import UserProfile from './pages/User/Profile';
import UserWallet from './pages/User/Wallet';

import ShowQRCode from './pages/User/ShowQRCode';
import UpgradeTicket from './pages/User/UpgradeTicket';
import Transfer from './pages/Transfer/Transfer';
import ProcessingTransfer from './pages/Transfer/Process';

const Home: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Home/Home'));
const Tickets: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Tickets/Tickets'));
const Search: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Search/Search'));
const Ticket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Ticket/Ticket'));
const User: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/User'));
const IssuedTickets: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/IssuedTickets'));
const BoughtTicket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/BoughtTicket'));
const IssuingTicket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/IssuingTicket/IssuingTicket'));
const Event: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Event/Event'));
const EventDetail: LazyExoticComponent<React.FC> = React.lazy(() => import('./components/Event/EventDetail'));
const CreateEvent: LazyExoticComponent<React.FC> = React.lazy(() => import('./components/Event/CreateEvent'));
const IssuedTicket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/IssuedTicket'));

const App: React.FC = (): ReactElement => {
  const [isExit, setExit] = useState<boolean>(false);
  return (
    <GlobalStyles>
      <ApolloProvider client={client}>
        <Exit.Provider value={{ isExit, setExit }}>
          <div className='App'>
            <Routes>
              <Route path="/" element={<PrivateRoute element={<Welcome />} />} />
              <Route path="/private_route" element={<PrivateRouteForm />} />
              <Route path="/login" element={<PrivateRoute element={<Login />} />} />
              <Route path="/home" 
                element={<PrivateRoute 
                  element={<React.Suspense 
                    fallback={<Loading />}><Home /></React.Suspense>} />} />
              <Route path="/search"
                element={<PrivateRoute
                  element={<React.Suspense 
                    fallback={<Loading />}><Search /></React.Suspense>} />} />
              <Route path="/tickets/:type"
                element={<PrivateRoute
                  element={<React.Suspense 
                    fallback={<Loading />}><Tickets /></React.Suspense>} />} />
              <Route path="/ticket/:id" 
                element={<PrivateRoute
                  element={<React.Suspense 
                    fallback={<Loading />}><Ticket /></React.Suspense>} />} />
              <Route path="/ticket/:id/buy" element={<PrivateRoute element={<BuyTicket />} />} />
              <Route path="/ticket/:id/buy/add_funds" element={<PrivateRoute element={<AddFunds />} />} />
              <Route path="/ticket/:id/buy/confirm" element={<PrivateRoute element={<Confirm />} />} />
              <Route path="/user" 
                element={<PrivateRoute 
                  element={<React.Suspense fallback={<Loading />}><User /></React.Suspense>} />} />
              <Route path="/user/issued_tickets/:id" 
                element={<PrivateRoute 
                  element={<React.Suspense 
                    fallback={<Loading />}><IssuedTickets /></React.Suspense>} />} />
              <Route path="/user/issued_ticket/:id" 
                element={<PrivateRoute 
                  element={<React.Suspense 
                    fallback={<Loading />}><IssuedTicket /></React.Suspense>} />} />
              <Route path="/user/bought_ticket/:id" 
                element={<PrivateRoute 
                  element={<React.Suspense 
                    fallback={<Loading />}><BoughtTicket /></React.Suspense>} />} />
              <Route path="/user/bought_ticket/:id/qr_code" element={<PrivateRoute element={<ShowQRCode />} />} />
              <Route path="/user/bought_ticket/:id/upgrade" element={<PrivateRoute element={<UpgradeTicket />} />} />
              <Route path="/user/bought_ticket/:id/transfer" element={<PrivateRoute element={<Transfer />} />} />
              <Route path="/user/bought_ticket/:id/transfer/process" element={<PrivateRoute element={<ProcessingTransfer />} />} />
              <Route path="/user/settings" element={<PrivateRoute element={<UserSettings />} />} />
              <Route path="/user/settings/profile" element={<PrivateRoute element={<UserProfile />} />} />
              <Route path="/user/settings/wallet" element={<PrivateRoute element={<UserWallet />} />} />
              <Route path="/issuing_ticket" 
                element={<PrivateRoute
                  element={<React.Suspense 
                    fallback={<Loading />}><IssuingTicket /></React.Suspense>} />} />
              <Route path="/event" 
                element={<PrivateRoute 
                  element={<React.Suspense 
                    fallback={<Loading />}><Event /></React.Suspense>} />} />
              <Route path="/event/:id" 
              element={<PrivateRoute 
                element={<React.Suspense 
                  fallback={<Loading />}><EventDetail /></React.Suspense>} />} />
              <Route path="/event/create_event" 
                element={<PrivateRoute 
                  element={<React.Suspense 
                    fallback={<Loading />}><CreateEvent /></React.Suspense>} />} />
              <Route path="*" element={<Error />}/>
            </Routes>
          </div>
        </Exit.Provider>
      </ApolloProvider>
    </GlobalStyles>
  )
}

export default App