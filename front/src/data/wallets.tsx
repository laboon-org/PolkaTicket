import IMG_MTM from '../assets/images/metamask.png';
import IMG_TEM from '../assets/images/temple.png';
import IMG_KUK from '../assets/images/kukai.png';

const wallets: {id: number, name: string, img: string, unit: string, available: boolean}[] = [
  {
    id: 1,
    name: "Temple",
    img: IMG_TEM,
    unit: "XTZ",
    available: true,
  },
  {
    id: 2,
    name: "Kukai",
    img: IMG_KUK,
    unit: "XTZ",
    available: false,
  },
  
]

export default wallets;