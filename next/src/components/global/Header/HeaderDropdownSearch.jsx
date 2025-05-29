import { useRouter } from 'next/router';
import { useState } from 'react';

/**
 * A client component that shows a search input
 */

export default function HeaderDropdownSearch() {

  const [ searchTerm, setSearchTerm ] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/shop?search=${ searchTerm }`);
  }

  return (
    <form className='' onSubmit={ handleSubmit }>
      <input
        className='px-2 block w-full focus:outline-none focus:ring-0 focus:font-bold rounded-none'
        type='search'
        placeholder='search'
        onChange={ (event) => setSearchTerm(event.target.value) }
        value={ searchTerm }
      />
      <div className='w-full border-t border-black p-4'>
        <input
          type='submit'
          className='bg-black border border-black rounded-[100px] text-white mouse:hover:font-normal block w-full text-center cursor-pointer p-1 mouse:hover:bg-transparent mouse:hover:text-black transition-colors duration-300'
          value='search'
        />
      </div>
    </form>
  );
}
