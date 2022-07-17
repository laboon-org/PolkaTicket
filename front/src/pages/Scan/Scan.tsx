import { Html5QrcodeResult } from 'html5-qrcode/esm/core';
import React, { useState } from 'react';
import ScanQRCode from '../../components/Scan/ScanQRCode';
import ScanResult from '../../components/Scan/ScanResult';
import SubHeader from '../../components/SubHeader/SubHeader';

import './Scan.css'

function Scan() {
  const [decodedResults, setDecodedResults] = useState<Html5QrcodeResult[]>([])

  const onNewScanResult = (decodeText: string, decodedResult: Html5QrcodeResult ): void => {
    // console.log("App [result]: ", decodedResult);
    
    setDecodedResults((decodedResults) => [...decodedResults, decodedResult]);
  }

  return (
    <div className="wrap border-x-only relative">
      <section className='container'>
        <SubHeader pageName='Scan Ticket' rootURL='/home'/>
        <div className='mt-6 w-full'>
          <ScanQRCode 
            fps={10} 
            qrbox={250} 
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        </div>
        <div className='w-full mt-6 flex flex-col justify-center items-center '>
          <ScanResult results={decodedResults}/>
        </div>
      </section>
    </div>
  );
}

export default Scan;
