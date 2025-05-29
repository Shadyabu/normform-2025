import { useState } from 'react';
import PortableTextBlocks from './PortableTextBlocks';

const BlockDropdown = ({ heading, content }) => {

  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <div>
      <button
        className='flex text-left items-top justify-between w-full cursor-pointer'
        onClick={ () => setIsOpen(!isOpen) }
        aria-label={ isOpen ? `Close ${ heading } dropdown` : `Open ${ heading } dropdown` }
      >
        <h2>{ heading }</h2>
        <span className='block'>{ isOpen !== true ? '+' : '-' }</span>
      </button>
      {
        isOpen &&
        <div className=''>
          {
            content?.length > 0 &&
            <PortableTextBlocks value={ content } />
          }
        </div>
      }
    </div>
  );
}

export default BlockDropdown;