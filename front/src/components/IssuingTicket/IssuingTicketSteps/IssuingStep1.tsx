import React, { useRef, useState } from 'react'

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}



const IssuingStep1: React.FC<Props> = ({setStep}: Props): React.ReactElement => {
  const [isFirstTime, setFirstTime] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const checkEmptyInput = (): void => {
    isFirstTime && setFirstTime(false);
    if (selectedEvent) setStep(step => step + 1);
  }
  return (
    <>
      <article className='flex-1'>
        <div className='issuing-label'>
          <label htmlFor="issuing-ticket-event-input">Event *</label>
        </div>
        <div className={`issuing-input mt-2 ${!isFirstTime && !selectedEvent && 'alert'} ${selectedEvent && 'active'}`}>
          <input 
            type="text" 
            id="issuing-ticket-event-input"
            className='cursor-pointer' 
            placeholder='Select event' 
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          />
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedEvent ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>*Please fill in the information</p>
        </div>
      </article>
      <article className='footer-full-w-btn w-full mt-10 mb-32'>
        <button className='primary-btn' onClick={checkEmptyInput}>
          Continue
        </button>        
      </article>
    </>
  )
}

export default IssuingStep1
