import React, { ReactElement } from 'react'

// import './OverviewItem.css'
import { Category } from '../../data/categories';

interface Props {
  categories: Category[],
  isFull?: boolean,
}

const EventCategories: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <div className='flex'>
        {props.isFull
        ? <>
          {props.categories.map(category => (
            <div key={category.id} className='ticket-category mr-1 my-1'
            >
              {category.name}
            </div>
          ))}
          </>
        : <>
            <div className='ticket-category mr-1 my-1'>
              {props.categories[0].name}
            </div>
            {props.categories.length > 1 &&
              <div className='ticket-category mr-1 my-1'>
                +{props.categories.length - 1}
              </div>
            }
          </>
        }
      </div>
    </>
  )
}

export default EventCategories