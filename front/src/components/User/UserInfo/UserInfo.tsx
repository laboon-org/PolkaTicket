import React, { useEffect, useRef, useState } from 'react'
import {BiCopy} from 'react-icons/bi'
import { useWallet } from '../../../contexts/WalletContext'

import IMG_AVATAR from '../../../assets/images/user-avatar.png'

const UserInfo = () => {
  const { address, walletType, isConnected } = useWallet();
  const avatarRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Generate Jazzicon avatar from wallet address
  useEffect(() => {
    if (address && avatarRef.current) {
      // Clear previous avatar
      avatarRef.current.innerHTML = '';
      
      // Generate simple gradient avatar based on address
      const seed = parseInt(address.slice(2, 10), 16);
      const hue = seed % 360;
      const gradient = `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 60) % 360}, 70%, 60%))`;
      
      const avatarDiv = document.createElement('div');
      avatarDiv.style.width = '128px';
      avatarDiv.style.height = '128px';
      avatarDiv.style.borderRadius = '50%';
      avatarDiv.style.background = gradient;
      avatarDiv.style.display = 'flex';
      avatarDiv.style.alignItems = 'center';
      avatarDiv.style.justifyContent = 'center';
      avatarDiv.style.fontSize = '48px';
      avatarDiv.style.fontWeight = 'bold';
      avatarDiv.style.color = 'white';
      avatarDiv.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
      avatarDiv.textContent = address.slice(2, 4).toUpperCase();
      
      avatarRef.current.appendChild(avatarDiv);
    }
  }, [address]);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  return (
    <>
      <div className='rounded-full overflow-hidden shadow-xl'>
        {isConnected && address ? (
          <div ref={avatarRef} />
        ) : (
          <img src={IMG_AVATAR} alt="User Avatar" className='object-cover w-32 h-32 object-center'/>
        )}
      </div>
      <div className='flex mt-6 items-center'>
        <p className='text-sm text-primaryColor font-semibold'>
          {isConnected && address ? formatAddress(address) : '0x05611eAf8505bdAA991f0c62C'}
        </p>
        <button 
          className='ml-2 text-lg opacity-60 hover:opacity-80'
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy address'}
        >
          <i><BiCopy /></i>
        </button>
        {copied && (
          <span className='ml-2 text-xs text-green-600 font-semibold'>✓ Copied!</span>
        )}
      </div>
      {isConnected && walletType && (
        <div className='mt-2 text-xs text-gray-500'>
          Connected via {walletType === 'metamask' ? 'MetaMask' : 'Polkadot.js'}
        </div>
      )}
    </>
  )
}

export default UserInfo