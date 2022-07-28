import React, { useState } from 'react'

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/Search/SearchBar/SearchBar';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import ModalUser from '../../components/Header/ModalUser';
import ModalWallet from '../../components/Header/ModalWallet';

import ticketsInfo from '../../data/ticket_infos'

const Search = () => {
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const [isWalletModal, setWalletModal] = useState<boolean>(false);

  return (
    <div className='wrap border-x-only relative'>
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal}/>
      )}
      <div className='container'>
        <section id="header" className='fixed-comp fixed top-0 py-6'>
          <div className='w-11/12'>
            <Header setWalletModal={setWalletModal} setUserModal={setUserModal}/>
            <SearchBar />
          </div>
        </section>
        <section className='w-full mt-44'>
          <SearchResult tickets={ticketsInfo}/>
        </section>
        <section id="footer" className='fixed-comp fixed bottom-0 pt-4 pb-3 border-t border-solid border-gray-300 rounded-t-3xl'>
        <div className='w-11/12'>
          <Footer activePage='search'/>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Search