import React, { MutableRefObject, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs';
import { MdRemoveCircle } from 'react-icons/md';

import { useMutation } from '@apollo/client';
import { CreateTicket, CREATE_TICKET } from '../../../api/mutation/createTicket';
import { useWallet } from '../../../contexts/WalletContext';
interface Props {
  setComplete: React.Dispatch<React.SetStateAction<boolean>>
  submitData: MutableRefObject<CreateTicket>
}

const IssuingStep3: React.FC<Props> = ({ setComplete, submitData }: Props) => {
  const [activeApproval, setActiveApproval] = useState<boolean>(false);
  const [approvals, setApprovals] = useState<string[]>([]);
  const [approvalInput, setApprovalInput] = useState<string>('');
  const [createTicket, { data, loading, error }] = useMutation(CREATE_TICKET);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintError, setMintError] = useState<string | null>(null);
  
  // Get wallet context
  const { isConnected, walletType, mintTicket } = useWallet();

  const handleAddApproval = () => {
    approvalInput && setApprovals([...approvals, approvalInput]);
    setApprovalInput('');
  }
  
  const submit = async () => {
    // Check if wallet is connected
    if (!isConnected) {
      setMintError('Please connect your wallet first');
      return;
    }

    setIsMinting(true);
    setMintError(null);

    try {
      // Mint NFT ticket on blockchain
      const result = await mintTicket(
        submitData.current.event || 1,
        submitData.current.ticket_type || 1,
        `ticket-${Date.now()}-${submitData.current.event}`
      );

      console.log('✅ Ticket minted on blockchain:', result);

      // Then create ticket in database
      await createTicket({
        variables: {
          ...submitData.current
        }
      });

      console.log('✅ Ticket saved to database');
      setComplete(true);
    } catch (err: any) {
      console.error('❌ Minting failed:', err);
      setMintError(err.message || 'Failed to mint ticket');
    } finally {
      setIsMinting(false);
    }
  }

  return (
    <>
      <article>
        <div className='issuing-label'>
          <label>Ticket Provider *</label>
        </div>
        <div className='issuing-input text-gray-400 mt-2'>
          <input
            type="input" readOnly
            value="0x0da46c783f8cxv85x6z5cxhxv12382"
          />
        </div>
      </article>
      <article>
        <div className='issuing-label mt-6 flex items-center justify-between'>
          <label htmlFor="issuing-ticket-approval-input">Ticket Approval(s)</label>
          {activeApproval || (
            <button className='add-approval' onClick={() => setActiveApproval(true)}>
              <i className='text-2xl'><BsPlusCircleFill /></i>
            </button>
          )}
        </div>

        {activeApproval && (
          <>
            <div className='issuing-input mt-2'>
              <input
                type="input" id="issuing-ticket-approval-input"
                placeholder='Add ticket approval'
                value={approvalInput}
                onChange={e => setApprovalInput(e.target.value)}
              />
              <button
                className={`add-approval mr-6 ${approvalInput ? 'enabled' : 'disabled'}`}
                onClick={handleAddApproval}>
                <i className='text-2xl'><BsPlusCircleFill /></i>
              </button>
            </div>
            <div>
              {approvals.length > 0 && approvals.map((approval, index) => (
                <div key={index} className='flex items-center mt-4 w-3/4'>
                  <div className="flex-1 px-6 bg-subBgColor rounded-3xl ">
                    <p className='py-2 text-sm font-semibold text-primaryColor'>{approval}</p>
                  </div>
                  <button
                    className='ml-2 opacity-60 hover:opacity-100'
                    onClick={() => setApprovals(approvals => approvals.filter(checkApproval => checkApproval !== approval))}
                  >
                    <i className='text-3xl text-gray-500'><MdRemoveCircle /></i>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </article>
      
      {/* Wallet Status */}
      {!isConnected && (
        <article className='mt-6'>
          <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
            <p className='text-sm text-yellow-800'>
              ⚠️ Please connect your wallet to issue tickets on blockchain
            </p>
          </div>
        </article>
      )}

      {isConnected && walletType && (
        <article className='mt-6'>
          <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
            <p className='text-sm text-green-800'>
              ✅ Connected via {walletType === 'metamask' ? 'MetaMask (Moonbase Alpha)' : 'Polkadot.js'}
            </p>
          </div>
        </article>
      )}

      {/* Error Display */}
      {mintError && (
        <article className='mt-6'>
          <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-sm text-red-800'>
              ❌ {mintError}
            </p>
          </div>
        </article>
      )}

      <article className='footer-full-w-btn w-full mt-10 mb-32'>
        <button 
          className='primary-btn' 
          onClick={submit}
          disabled={!isConnected || isMinting}
        >
          {isMinting ? 'Minting Ticket...' : 'Issue Ticket on Blockchain'}
        </button>
      </article>
    </>
  )
}

export default IssuingStep3