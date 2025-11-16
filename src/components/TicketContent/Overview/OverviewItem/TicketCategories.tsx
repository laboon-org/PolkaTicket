import React, { ReactElement } from 'react'

import './OverviewItem.css'
import { Category } from '../../../../data/categories';

interface Props {
  categories: [{
    eventCategory: {
      id: number;
      name: string;
  };
  }],
  isFull?: boolean,
}

const TicketCategories: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <div>
        {props.isFull
        ? <>
          {props.categories.map(category => (
            <div key={category.eventCategory.id} className='ticket-category mr-1 my-1'
            >
              {category.eventCategory.name}
            </div>
          ))}
          </>
        : <>
            <div className='ticket-category mr-1 my-1'>
              {props.categories[0].eventCategory.name}
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

export default TicketCategories