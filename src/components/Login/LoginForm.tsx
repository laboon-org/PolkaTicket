import React, { ReactElement } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import IMG_LOGO from '../../assets/images/polka.png';
import wallets from '../../data/wallets';
import './LoginForm.css';
import {LoginCheck} from '../../util/LoginCheck';


const LoginForm: React.FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleLogin = () => {
    LoginCheck() ? navigate('/home') : navigate('/');
  }
  return (
    <div className='container'>
      {/* Login Title */}
      <div className='title-wrap text-center mt-12'>
        <div id="logo" className='flex justify-center'>
          <img src={IMG_LOGO} alt="NTS" className='object-cover h-32' />
        </div>
        <div id="title" className='mt-12'>
          <h2 className='font-bold text-3xl'>
            Connect your wallet
          </h2>
        </div>
        <div id="description" className='mt-4'>
          <p className='text-sm font-semibold'>
            Integrate with any of our available wallet providers.
          </p>
        </div>
      </div>

      {/* Connect Field */}
      <div id='wallets' className='login-field flex-1 mt-2 mb-20 w-full'>
        {wallets.map(wallet => (
          <div id='wallet' key={wallet.id} className='login-item w-full flex items-center  
          justify-between px-4 rounded-xl py-1 shadow-lg border-2 border-solid border-whiteSmoke mt-12'
          >
            <div id="wallet-name" className='flex items-center mr-6'>
              <img  src={wallet.img} alt="Metamask" className='mr-3 object-cover h-6' />
              <div className='text-lg font-semibold'>
                <p>{wallet.name.toUpperCase()}</p>
            </div>
          </div>
          <div id="wallet-connect" className='text-md select-none text-right'>
            {wallet.available 
              ? <button 
                  type='button'
                  onClick={handleLogin}
                  className='text-primaryColor py-4 pl-4 cursor-pointer opacity-75 
                    hover:opacity-100 focus:opacity-100'
                >
                  Connect
                </button>
              : <p className='disabled opacity-50 py-4 pl-4'>Coming Soon!</p>}
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default LoginForm