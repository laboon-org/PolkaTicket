import React, { useState } from 'react'

import './IssuingTicket.css';
import CompleteModal from './IssuingTicketModal/CompleteModal';
import IssuingStep1 from './IssuingTicketSteps/IssuingStep1';
import IssuingStep2 from './IssuingTicketSteps/IssuingStep2';
import IssuingStep3 from './IssuingTicketSteps/IssuingStep3';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}



const IssuingStepContent: React.FC<Props> = ({step, setStep}: Props): React.ReactElement => {
  const [isComplete, setComplete] = useState<boolean>(false);
  return (
    <>
      {isComplete &&
        <CompleteModal setComplete={setComplete}/>
      }
      <article className='flex-1 flex w-full'>
        {/* Step 1 */}
        <div className={step === 1 ? 'flex flex-col flex-1' : 'hidden'}>
          <IssuingStep1 setStep={setStep}/>
        </div>

        {/* Step 2 */}
        <div className={step === 2 ? 'flex flex-col flex-1' : 'hidden'}>
          <IssuingStep2 setStep={setStep}/>
        </div>

        {/* Step 3 */}
        <div className={step === 3 ? 'flex flex-col flex-1' : 'hidden'}>
          <IssuingStep3 />
        </div>
      </article>
    </>
  )
}

export default IssuingStepContent