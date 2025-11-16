import React from 'react'
import {ImCross} from 'react-icons/im'

import './Header.css'

import IMG_BALANCE from '../../assets/images/user-info-balance-img.png'
import IMG_ISSUED from '../../assets/images/user-info-issue-img.png'
import IMG_SOLD from '../../assets/images/user-info-sold-img.png'
import IMG_BOUGHT from '../../assets/images/user-info-bought-img.png'

interface Props {
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalUser: React.FC<Props> = (props: Props): React.ReactElement => {
  const cancelModal = (): void => {
    props.setUserModal(false);
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
            <p className='font-semibold text-xl'>Account Overview</p>
          </div>
          <div className='mt-8 mb-4 flex flex-col items-center'>
            <div className='header-modal-item'>
              <div className='header-modal-title'>
                <div className='header-modal-icon user'>
                  <img src={IMG_ISSUED} alt="Balance" />
                </div>
                <div className='header-modal-info user'>
                  <h6>Tickets Issued</h6>
                </div>
              </div>
              <div className='header-modal-value'>
                <p>100</p>
              </div>
            </div>
            <div className='header-modal-item'>
              <div className='header-modal-title'>
                <div className='header-modal-icon user'>
                  <img src={IMG_SOLD} alt="Balance" />
                </div>
                <div className='header-modal-info user'>
                  <h6>Ticket Sold</h6>
                </div>
              </div>
              <div className='header-modal-value'>
                <p>10</p>
              </div>
            </div>
            <div className='header-modal-item'>
              <div className='header-modal-title'>
                <div className='header-modal-icon user'>
                  <img src={IMG_BOUGHT} alt="Balance" />
                </div>
                <div className='header-modal-info user'>
                  <h6>Ticket Bought</h6>
                </div>
              </div>
              <div className='header-modal-value'>
                <p>11</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default ModalUser