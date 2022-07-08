import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

interface Props {
  pageName: string,
  rootURL: string,
}

const SubHeader:React.FC<Props> = (props: Props): ReactElement => {
  const navigate = useNavigate();
  const handleNavigate = (): void => {
    navigate(props.rootURL);
  }

  return (
    <section className='flex items-center mt-10'>
      <button onClick={handleNavigate} className="opacity-80 hover:opacity-100">
        <i className='text-2xl text-primaryColor'><IoMdArrowRoundBack /></i>
      </button>
      <p className='text-xl font-semibold ml-6'>{props.pageName}</p>
    </section>
  )
}

export default SubHeader