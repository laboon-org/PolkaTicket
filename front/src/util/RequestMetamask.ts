import detectEthereumProvider from "@metamask/detect-provider";
import { client } from "../api/client";
import { CREATE_USER } from "../api/mutation/createUser";
import { getDataAccount } from "../api/queries";
import Web3 from 'web3'

export default async ({ account, setAccount, navigate }: any) => {
  const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });

  if (provider) {
    const web3 = new Web3(provider)
    try {
      const accounts = await provider.request({
        method: "wallet_requestPermissions", params: [
          {
            eth_accounts: {}
          }
        ]
      });

      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x507", // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
            chainName: "Moonbase Alpha",
            nativeCurrency: {
              name: 'DEV',
              symbol: 'DEV',
              decimals: 18
            },
            rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
            blockExplorerUrls: ["https://moonbase.moonscan.io/"]
          },
        ]
      })
      // Exist account from wallet metamask
      if (accounts && accounts[0]) {
        const balance = web3.utils.fromWei(
          await web3.eth.getBalance(accounts[0]),
          "ether"
        );
        const accountFromWallet = accounts[0].caveats[0].value[0]
        console.log(accountFromWallet);

        const accountFetch: any = await client
          .query({
            query: getDataAccount,
            variables: {
              wallet_address: accountFromWallet
            },
            fetchPolicy: 'no-cache',
          })
          .catch((err) => console.error(err));
        // Account exist
        if (accountFetch && accountFetch.data.UserNonce[0] && accountFetch.data.UserNonce[0].UserWallet && accountFetch.data.UserNonce[0].UserWallet.wallet_address) {
          console.log('Account exist', accountFetch.data);
          setAccount({
            ...account,
            user: accountFromWallet,
            id: accountFetch.data.UserNonce[0].id,
            balance: Number(balance),
            fetch: true
          })
          navigate('/home')
        }

        // Create new Account
        else {
          console.log('Create new Account');
          const accountFetchNewAccount: any = await client
            .mutate({
              mutation: CREATE_USER,
              variables: {
                wallet_address: accountFromWallet
              },
            })
            .catch((err) => console.error(err));

          if (accountFetchNewAccount) {
            setAccount({
              ...account,
              user: accountFromWallet,
              id: accountFetchNewAccount.data.createWallet.user_id,
              balance: Number(balance),
              fetch: true
            })
            navigate('/home')
          }
        }
      }

    } catch (e) {
      console.error(e);
    }
  } else {
    alert("Please install MetaMask");
  }
}