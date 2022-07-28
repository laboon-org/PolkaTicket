import React, { MutableRefObject, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { RiTicketFill } from 'react-icons/ri'
import { CreateTicket } from '../../../api/mutation/createTicket';
import TicketTypeModal from '../IssuingTicketModal/TicketTypeModal';
interface SelectTypeT {
  id: number,
  name: string
}
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  submitData: MutableRefObject<CreateTicket>
}
const IssuingStep2: React.FC<Props> = ({ setStep, submitData }: Props): React.ReactElement => {
  const [isFirstTime, setFirstTime] = useState<boolean>(true);
  const [activeTypeModal, setActiveTypeModal] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<SelectTypeT>({ id: 0, name: '' });
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [selectedImgURL, setSelectedImgURL] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const objectUrl: string = URL.createObjectURL(e.target.files[0])
      setSelectedImgURL(objectUrl);
    }
  }

  const checkEmptyInput = (): void => {
    isFirstTime && setFirstTime(false);
    if (selectedType.id && selectedPrice && selectedAmount && selectedImgURL) {
      submitData.current = {
        ...submitData.current,
        ticket_type: selectedType.id,
        price: selectedPrice,
        supply: Number(selectedAmount),

      }
      setStep(step => step + 1);
    }
  }

  return (
    <>
      {/* Modal */}
      <>
        {activeTypeModal && (
          <TicketTypeModal
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setActiveTypeModal={setActiveTypeModal}
          />
        )}
      </>
      {/* Ticket Image Input */}
      <article className='flex-1'>
        <div className='issuing-label'>
          <label htmlFor="issuing-ticket-img-input">Cover image *</label>
        </div>
        <div >
          <label
            htmlFor='issuing-ticket-img-input'
            className={`issuing-cover-img w-full overflow-hidden ${!isFirstTime && !selectedImgURL && 'alert'} ${selectedImgURL && 'active'}`}
          >
            {selectedImgURL
              ?
              <img
                src={selectedImgURL} alt="Selected Cover"
                className='object-cover w-full h-full object-center'
              />
              :
              <>
                <i className='text-3xl'><FaCamera /></i>
                <p className='mt-2'>Select cover image</p>
              </>
            }
          </label>
          <input
            type="file" id="issuing-ticket-img-input"
            className='hidden' accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedImgURL ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>*Please fill in the information</p>
        </div>
      </article>

      {/* Ticket Type Input */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-type-input">
            Ticket type *
          </label>
        </div>
        <div className='mt-2'>
          <button
            type="button"
            id="issuing-ticket-type-input"
            className={`issuing-input-btn ${!isFirstTime && !selectedType.id && 'alert'} ${selectedType.id ? 'active' : 'empty'}`}
            onClick={() => setActiveTypeModal(true)}
          >
            <p>{selectedType.id ? selectedType.name : 'Select ticket type'}</p>
            <i><RiTicketFill /></i>
          </button>
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedType.id ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>*Please fill in the information</p>
        </div>
      </article>

      {/* Ticket Price */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-price-input">Price *</label>
        </div>
        <div className={`issuing-input mt-2 ${!isFirstTime && !selectedPrice && 'alert'} ${selectedPrice && 'active'}`}>
          <input
            type="number"
            min="0"
            id="issuing-ticket-price-input"
            placeholder='Set price'
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          />
          <p>XTZ</p>
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedPrice ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>*Please fill in the information</p>
        </div>
      </article>

      {/* Ticket Supply */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-amount-input">Amount *</label>
        </div>
        <div className={`issuing-input mt-2 ${!isFirstTime && !selectedAmount && 'alert'} ${selectedAmount && 'active'}`}>
          <input
            type="number"
            min="0"
            id="issuing-ticket-amount-input"
            placeholder='Set amount of ticket'
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
          />
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedAmount ? 'block' : 'hidden'}`}>
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

export default IssuingStep2