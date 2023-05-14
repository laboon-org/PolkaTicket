import IMG_METAMASK from '../assets/images/metamask.png';;
import IMG_POLKA from '../assets/images/polka_wallet.png';

const wallets: {id: number, name: string, img: string, unit: string, available: boolean}[] = [
  {
    id: 1,
    name: "Metamask",
    img: IMG_METAMASK,
    unit: "DOT",
    available: true,
  },
  {
    id: 2,
    name: "Polkadot.JS",
    img: IMG_POLKA,
    unit: "DOT",
    available: true,
  },
]

export default wallets;