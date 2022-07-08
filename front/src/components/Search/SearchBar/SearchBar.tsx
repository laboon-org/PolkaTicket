import React, { ReactElement } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useNavigate, NavigateFunction } from 'react-router-dom';

const SearchBar: React.FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleSearch = (): void => {
    navigate('/search');
  }
  return (
    <section id="search" className='mt-10'>
      <article id="search-bar" className='input'>
        <input type="text" placeholder='Search' className='py-2 bg-transparent flex-1 min-w-0'/>
        <button 
          className='opacity-60 hover:opacity-100 focus:opacity-100 px-4'
          onClick={handleSearch}
        >
          <i className='text-primaryColor text-2xl'><RiSearchLine /></i>
        </button>
      </article>
    </section>
  )
}

export default SearchBar