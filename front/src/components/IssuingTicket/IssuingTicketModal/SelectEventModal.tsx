import React, { useState } from 'react'
import type { } from '@mui/x-date-pickers/themeAugmentation';
import EVENT_ICON from '../../../assets/images/event-icon.png'
import CATEGORY_ICON from '../../../assets/images/category-icon.png'
import LOCATION_ICON from '../../../assets/images/location-icon.png'
import { ImCheckmark } from 'react-icons/im'
import { Event, getEventsUser } from '../../../api/queries';
import { useQuery } from '@apollo/client';
import events from '../../../data/events';
interface SelectedEvent {
  id: number,
  name: string
}
interface Props {
  showModal: React.Dispatch<React.SetStateAction<boolean>>
  setData: (value: SelectedEvent) => void;
  currentSelected: SelectedEvent
}

const SelectEventModal: React.FC<Props> = ({ showModal, setData, currentSelected }: Props): React.ReactElement => {
  const [selected, setSelected] = useState<SelectedEvent>(currentSelected)
  const { loading, error, data } = useQuery(getEventsUser);

  const handleSelected = () => {
    setData(selected)
    showModal(false)
  }

  if(error) return <div>Error 404</div>
  return (
    <section className='modal-wrap'>
      <div className='modal-bg'></div>
      <div className='fixed-comp modal'>
        <div className='mt-4 font-bold text-xl mb-4'>
          Events
        </div>
        <div className='wrap-event-list w-11/12'>
          {
            loading &&
            <svg role="status" className="text-center inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-color" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 
          50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144
           50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422
           4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
            10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 
            32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          }
          {
            data &&
            data.events.map((event: Event) => {
              return ((
                <div key={event.id} onClick={() => setSelected({ id: event.id, name: event.name })} className='mt-6 border-bottom hover:opacity-60 cursor-pointer'>
                  <div className='event-item'>
                    <div className='flex justify-between items-center font-bold text-xl mb-4'>
                      {event.name}
                      {
                        selected.id === event.id &&
                        <i className='primaryColor-icon'>
                          <ImCheckmark />
                        </i>
                      }
                    </div>
                    <div className='flex items-center mb-3'>
                      <img src={EVENT_ICON} className="mr-2" alt="event_id" />
                      <div>{event.id}</div>
                    </div>
                    <div className='flex items-center mb-3'>
                      <img src={CATEGORY_ICON} className="mr-2" alt="category" />
                      <span>
                        {event.eventCategoryItems.map((category, index) => {
                          return (
                            <span key={category.eventCategory.id}>
                              {category.eventCategory.name}
                              {event.eventCategoryItems.length - 1 === index ? '' : ', '}
                            </span>
                          )
                        })}
                      </span>
                    </div>
                    <div className='flex items-center mb-3'>
                      <img src={LOCATION_ICON} className="mr-2" alt="location" />
                      <div>{event.location}</div>
                    </div>
                  </div>
                </div>
              )
              )
            })
          }
        </div>
        <div className='w-10/12'>
          <div className='footer-full-w-btn mb-6 mt-3'>
            <button className='primary-btn cursor-pointer' onClick={handleSelected}>
              OK
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}

export default SelectEventModal