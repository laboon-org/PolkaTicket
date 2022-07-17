import React, { useContext } from 'react'
import { AccountContext } from '../../context/AccountData'

interface Props {
  totalPrice: number,
  userName: string,
}

const ConfirmContent: React.FC<Props> = ({totalPrice, userName}: Props): React.ReactElement => {
  const userData = useContext(AccountContext)

  return (
    <>
      {/* Introduction */}
      <article className='mt-8 text-center'>
        <h6 className='text-lg font-semibold'>
          You need <span className='text-primaryColor'>{totalPrice} DEV</span> to buy ticket
        </h6>
        <div className='text-sm mt-3'>
          <p>Press Confirm to buy this ticket.</p>
          <p>It may take a minute to complete your order.</p>
        </div>
      </article>

      {/* Wallet Input */}
      <article className='mt-8'>
        <div className='flex justify-between text-sm'>
          <div className='font-semibold'>Your MetaMask wallet:</div>
          <div>
            Balance: <span>{Number(userData.account.balance).toFixed(3)} DEV</span>
          </div>
        </div>
        <div className='flex border border-solid rounded-3xl w-full pl-6 pr-2 mt-4
        border-whiteSmoke bg-inputBgColor select-none'
        >
          <input 
            type="text" 
            className='py-2 bg-transparent flex-1 min-w-0 text-gray-400 font-semibold' 
            value={userName}
            readOnly
          />
        </div>
      </article>
    </>
  )
}

export default ConfirmContent