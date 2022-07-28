import React, { ReactElement } from 'react'

const haveContent = true;

const Sold: React.FC = (): ReactElement => {
  return (
    <article className='mb-40 mt-16'>
      {haveContent 
      ? <>
          <div className='sold-stat'>
            <h6>Ticket:</h6>
            <div className='sold-stat-wrap'>
              <div className='sold-stat-details'>
                <p>One time usage<span>11.900K</span></p>
                <p><span>111.900 XTZ</span></p>
              </div>
              <div className='sold-stat-details'>
                <p>Multi time usage<span>90K</span></p>
                <p><span>90.900 XTZ</span></p>
              </div>
            </div>
          </div>
          <div className='sold-stat flex justify-between mt-10'>
            <h6 className=''>Total proceeds:</h6>
            <div className='font-semibold text-right '>
              <p className='text-xl text-primaryColor'>202.800 XTZ</p>
              <p className='text-gray-500'>(4.235.678.50 $)</p>
            </div>
          </div>
        </>
        
      : <div className='stat-null'>You haven’t sold any ticket yet.</div>
      }
    </article>
  )
}

export default Sold