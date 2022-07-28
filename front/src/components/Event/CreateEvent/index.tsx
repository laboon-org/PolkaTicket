import React, { useState } from 'react'
import { BsFillCalendarEventFill, BsFillClockFill } from 'react-icons/bs'
import { FaCamera } from 'react-icons/fa'
import { IoMdCloseCircle } from 'react-icons/io'
import EventDateModal from './EventDateModal';
import EventTimeModal from './EventTimeModal';
import EventCategoriesModal from './EventCategoriesModal';
import EventHeaderDetail from '../EventHeaderDetail';
import CompleteModal from './CompleteModal';

import categories, { Category } from '../../../data/categories';
import ConvertCategories, { ConvertCategoriesType } from '../../../util/ConvertCategories'

import '../../../pages/Event/Event'
import '../../IssuingTicket/IssuingTicket.css'

const IssuingStep2 = () => {
  const [activeDateModal, setActiveDateModal] = useState<boolean>(false);
  const [activeTimeModal, setActiveTimeModal] = useState<boolean>(false);
  const [activeTypeModal, setActiveTypeModal] = useState<boolean>(false);
  const [isComplete, setComplete] = useState<boolean>(false);
  const [isStartDateTime, setStartDateTime] = useState<boolean>(false);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<ConvertCategoriesType[]>(ConvertCategories());
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<string>('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      const objectUrl: string = URL.createObjectURL(e.target.files[0])
      setSelectedImg(objectUrl);
    }
  }

  const handleDeleteCategory = (id: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const newValue = selectedCategory.map(ele => ele.id === id ? { ...ele, check: false } : ele)
    setSelectedCategory(newValue)
  }

  return (
    <div className='wrap border-x-only relative'>
      {/* Modal */}
      <>
        {isComplete &&
          <CompleteModal setComplete={setComplete} />
        }

        {activeDateModal &&
          (isStartDateTime
            ?
            <EventDateModal
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
              setActiveDateModal={setActiveDateModal}
            />
            :
            <EventDateModal
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
              setActiveDateModal={setActiveDateModal}
            />
          )
        }
        {activeTimeModal &&
          (isStartDateTime
            ?
            <EventTimeModal
              selectedTime={selectedEndDate}
              setSelectedTime={setSelectedStartTime}
              setActiveTimeModal={setActiveTimeModal}
            />
            :
            <EventTimeModal
              selectedTime={selectedEndTime}
              setSelectedTime={setSelectedEndTime}
              setActiveTimeModal={setActiveTimeModal}
            />
          )
        }
        {activeTypeModal && (
          <EventCategoriesModal
            selectedCategory={selectedCategory}
            setActiveTypeModal={setActiveTypeModal}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </>
    <div className='container create-event '>
      <EventHeaderDetail rootURL="/event" name="Create Event" />
      <div>
        <div className='issuing-label mb-3'>
          <label htmlFor="issuing-ticket-type-input">
            Create New Event
          </label>
        </div>
        <div>
          You need to generate data for the event for which you want to generate tickets.
        </div>
      </div>

      {/* Event Name Input */}
      <article className='mb-6'>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-price-input">Event name *</label>
        </div>
        <div className={`issuing-input mt-2`}>
          <input
            type="text"
            id="issuing-ticket-price-input"
            placeholder='Event name'
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          />
        </div>
      </article>

      <article>
        <div className='issuing-label'>
          <label htmlFor="event">Cover image *</label>
        </div>
        <div >
          <label
            htmlFor='issuing-ticket-img-input'
            className={`issuing-cover-img w-full overflow-hidden ${selectedImg && 'active'}`}
          >
            {selectedImg
              ?
              <img
                src={selectedImg} alt="Selected Cover"
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
      </article>
      {/* categories */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-type-input">
            Categories *
          </label>
        </div>
        <div className='mt-2'>
          <button
            type="button"
            id="issuing-ticket-type-input"
            className={`issuing-input-btn ${selectedCategory.some(ele => ele.check) ? 'active' : 'empty'}`}
            onClick={() => setActiveTypeModal(true)}
          >
            <p className='flex'>
              {selectedCategory.some(ele => ele.check) ?
                selectedCategory.map(ele => {
                  return (
                    ele.check ?
                      <span className='category-item' key={ele.id}>
                        {
                          ele.name
                        }
                        <i className='times-X' onClick={(e) => handleDeleteCategory(ele.id, e)}>
                          <IoMdCloseCircle />
                        </i>
                      </span>
                      : '')
                })
                : 'Select categories'}</p>
          </button>
        </div>
      </article>

      {/* Event Location Input */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-price-input">Location *</label>
        </div>
        <div className={`issuing-input mt-2`}>
          <input
            type="text"
            id="issuing-ticket-price-input"
            placeholder="Add event's location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          />
        </div>
      </article>

      {/* Ticket Start Date Input */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-start-date-input">
            Start date and time *
          </label>
        </div>
        <div className='mt-2'>
          <button
            type="button"
            id="issuing-ticket-start-date-input"
            className={`issuing-input-btn ${selectedStartDate && 'active'}`}
            onClick={() => { setActiveDateModal(true); setStartDateTime(true) }}
          >
            <p>{selectedStartDate ? selectedStartDate.toLocaleDateString('en-US') : 'Select start date'}</p>
            <i><BsFillCalendarEventFill /></i>
          </button>
          <button
            type="button"
            id="issuing-ticket-start-date-input"
            className={`issuing-input-btn mt-4 ${selectedStartTime && 'active'}`}
            onClick={() => { setActiveTimeModal(true); setStartDateTime(true) }}
          >
            <p>
              {selectedStartTime
                ? selectedStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : 'Select start time'
              }
            </p>
            <i><BsFillClockFill /></i>
          </button>
        </div>
      </article>

      {/* Ticket End Date Input */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-end-date-input">
            End date and time *
          </label>
        </div>
        <div className='mt-2'>
          <button
            type="button"
            id="issuing-ticket-end-date-input"
            className={`issuing-input-btn ${selectedEndDate && 'active'}`}
            onClick={() => { setActiveDateModal(true); setStartDateTime(false) }}
          >
            <p>{selectedEndDate ? selectedEndDate.toLocaleDateString('en-US') : 'Select end date'}</p>
            <i><BsFillCalendarEventFill /></i>
          </button>
          <button
            type="button"
            id="issuing-ticket-end-time-input"
            className={`issuing-input-btn mt-4 ${selectedEndTime && 'active'}`}
            onClick={() => { setActiveTimeModal(true); setStartDateTime(false) }}
          >
            <p>
              {selectedEndTime
                ? selectedEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : 'Select end time'
              }
            </p>
            <i><BsFillClockFill /></i>
          </button>
        </div>
      </article>

      {/* Ticket Type Input */}
      <div className='footer-full-w-btn w-full mt-10 mb-6'>
        <button
          type='button'
          className='primary-btn'
          onClick={()=>setComplete(true)}
        >
          Create
        </button>
      </div>
    </div>
    </div>
  )
}

export default IssuingStep2