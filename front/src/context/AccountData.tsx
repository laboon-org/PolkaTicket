import { useLazyQuery, useMutation } from '@apollo/client'
import detectEthereumProvider from '@metamask/detect-provider'
import React, { useEffect } from 'react'
import { createContext, useState } from "react"
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../api/mutation/createUser'
import { getDataAccount } from '../api/queries'
import Web3 from 'web3'
import Loading from '../components/Loading/Loading';
interface Props {
  children: React.ReactElement,
}
export interface UserInfo {
  id: string,
  user: string,
  img: string,
  balance: number
  fetch: boolean
}
export type CurrentUser = {
  account: UserInfo,
  setAccount: React.Dispatch<React.SetStateAction<UserInfo>>
  checked?: boolean
}
export const AccountContext = createContext<CurrentUser>({
  account: {
    id: '',
    user: '',
    img: '',
    balance: 0,
    fetch: false
  },
  setAccount: () => { return },
  checked: false,
})

const AccountData: React.FC<Props> = ({ children }: Props): React.ReactElement => {
  const [DataAccount, { data, loading }] = useLazyQuery(getDataAccount)
  const navigate: NavigateFunction = useNavigate();

  const [checked, setChecked] = useState(true)
  const [account, setAccount] = useState({
    id: '',
    user: '',
    // TODO: change this data
    img: 'https://i.pinimg.com/736x/5b/10/43/5b1043b291948b71641bacce071dff3c.jpg',
    balance: 0,
    fetch: false
  })
  const { ethereum }: any = window;
  console.log(account);

  useEffect(() => {
    const checkMetamask = async () => {
      const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });

      if (provider && ethereum) {
        const web3 = new Web3(provider)
        const chainId = await provider.request({
          method: 'eth_chainId',
        });

        // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
        if (chainId === '0x507') {
          const accounts = await ethereum.request({
            method: 'eth_accounts',
          });
          // Case Account exist
          if (accounts && accounts[0]) {
            // GET balance from wallet
            const balance = web3.utils.fromWei(
              await web3.eth.getBalance(accounts[0]),
              "ether"
            );

            const accountFetch = await DataAccount({
              variables: {
                wallet_address: accounts[0]
              }
            })
            if (accountFetch && accountFetch.data.UserNonce[0] && accountFetch.data.UserNonce[0].UserWallet && accountFetch.data.UserNonce[0].UserWallet.wallet_address) {
              console.log('Account already exist', accountFetch.data);
              setAccount({
                ...account,
                user: accounts[0],
                id: accountFetch.data.UserNonce[0].id,
                balance: Number(balance),
                fetch: true
              })
            }
          }
          setChecked(false)
        } else {
          // Only Moonbase Alpha is Supported
          // alert('Only Moonbase Alpha Supported');
          setChecked(false)
        }
      } else {
        // alert('MetaMask not detecte');
        setChecked(false)
      }
    };
    (
      async () => {
        await checkMetamask();
        // Check for changes in Metamask (account and chain)
        if (ethereum) {
          ethereum.on('chainChanged', () => {
            window.location.reload();
          });
          ethereum.on('accountsChanged', async () => {
            const accounts = await ethereum.request({
              method: 'eth_accounts',
            });
            if (accounts && accounts[0]) {
              navigate('/home')
              window.location.reload();
            }
            else {
              navigate('/login')
              window.location.reload();
            }
          });
        }
      }
    )()
  }, []);
  return (
    <AccountContext.Provider value={{ account, setAccount, checked }}>

      {
        checked ?
          <Loading />
          :
          children
      }
    </AccountContext.Provider>
  )
}

export default AccountData