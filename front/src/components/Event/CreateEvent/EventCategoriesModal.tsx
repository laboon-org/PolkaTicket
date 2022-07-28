import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { ConvertCategoriesType } from '../../../util/ConvertCategories'
import { Checkbox } from '@mui/material'

interface Props {
  selectedCategory: ConvertCategoriesType[];
  setActiveTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategory: (value: ConvertCategoriesType[]) => void;
}

const EventCategoriesModal: React.FC<Props> = ({ selectedCategory, setActiveTypeModal, setSelectedCategory }: Props): React.ReactElement => {
  const [listCheckBox, setListCheckBox] = useState<ConvertCategoriesType[]>(selectedCategory);

  const confirmModal = (): void => {
    // update state category
    setSelectedCategory(listCheckBox)
    setActiveTypeModal(false);
  }

  const cancelModal = (): void => {
    setActiveTypeModal(false);
  }

  const updateCheckBox = (id: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const newValue = listCheckBox.map(ele => ele.id === id ? { ...ele, check: !ele.check } : ele)
    setListCheckBox(newValue)
  }
  
  return (
    <section className='modal-wrap'>
      <div className='modal-bg' onClick={cancelModal}></div>
      <div className='fixed-comp modal'>
        <div className='modal-exit-btn'>
          <button onClick={cancelModal}>
            <i><ImCross /></i>
          </button>
        </div>
        <div className='w-10/12 mt-12'>
          {listCheckBox.map(category => (
            <div key={category.id} className=' items-center border-b border-solid mt-3 pb-3'>
              <button
                className='w-full flex justify-between items-center'
              >
                <p>
                  <Checkbox
                    checked={category.check}
                    onClick={(e) => updateCheckBox(category.id, e)}
                  />
                  {category.name}
                </p>
              </button>

            </div>
          ))}
          <div className='footer-full-w-btn my-6'>
            <button className='primary-btn' onClick={confirmModal}>
              OK
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventCategoriesModal