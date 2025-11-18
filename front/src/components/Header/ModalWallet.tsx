import React from 'react';
import { ImCross } from 'react-icons/im';
import UnifiedWalletConnect from '../UnifiedWalletConnect';

interface Props {
  setWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWallet: React.FC<Props> = ({ setWalletModal }: Props): React.ReactElement => {
  const cancelModal = (): void => {
    setWalletModal(false);
  }
  
  return (
    <section className='modal-wrap'>
      <div className='modal-bg' onClick={cancelModal}></div>
      <div className='fixed-comp modal'>
        <div className='modal-exit-btn'>
          <button onClick={cancelModal}>
            <i><ImCross /></i>
          </button>
        </div>
        <div className='w-10/12'>
          <div className='mt-12 flex justify-center w-full'>
            <p className='font-semibold text-xl'>Connect Wallet</p>
          </div>
          <div className='mt-8 mb-4 flex flex-col items-center w-full'>
            <UnifiedWalletConnect />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModalWallet