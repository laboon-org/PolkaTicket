import { Html5QrcodeResult } from 'html5-qrcode/esm/core';
import React from 'react'

interface Props {
  results: Html5QrcodeResult[];
}

const filterResults = (results: Html5QrcodeResult[]) => {
  const fillteredResults: Html5QrcodeResult[] = [];
  for (let i = 0; i < results.length; i++) {
    if (i === 0) {
      fillteredResults.push(results[i]);
      continue;
    }

    if (results[i].decodedText !== results[i-1].decodedText) {
      fillteredResults.push(results[i]);
    }
  }
  return fillteredResults;
}

const ScanResult: React.FC<Props> = (props: Props): React.ReactElement => {
  const results: Html5QrcodeResult[] = filterResults(props.results);
  return (
    <div className=''>
      <div className=''>Scanned results ({results.length})</div>
      <div className=''>
        {
          results.map((result, index) => (
            <div key={index}>
              <p># {index}</p>
              <p>Decoded Text: {result.decodedText}</p>
              <p>Format: {result.result.format && result.result.format.formatName}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ScanResult