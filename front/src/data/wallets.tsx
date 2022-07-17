import IMG_MTM from '../assets/images/metamask.png';
import IMG_SWL from '../assets/images/subwallet.png'
import IMG_TEM from '../assets/images/temple.png';
import IMG_KUK from '../assets/images/kukai.png';

const wallets: {id: number, name: string, img: string, available: boolean}[] = [
  {
    id: 1,
    name: "MetaMask",
    img: IMG_MTM,
    available: true,
  },
  {
    id: 2,
    name: "SubWallet",
    img: IMG_SWL,
    available: false,
  },
  
]

export default wallets;