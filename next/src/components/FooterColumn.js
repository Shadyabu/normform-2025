import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useState } from 'react';
import Link from 'next/link';
import createLinkInternalSlug from '@/utils/createLinkInternalSlug';

const FooterColumn = ({ column, index }) => {

  const { windowWidth } = useSiteGlobals();
  const [ columnIsActive, setColumnIsActive ] = useState(false);

  return (
    <div key={ index } className='col-span-1 text-left'>
      <h2 className='uppercase max-sm:grid max-sm:grid-cols-2'>
        {
          column.titleLinkType === 'none' ?
            column.title
            :
            column.titleLinkType === 'linkInternal' ?
              <Link href={ createLinkInternalSlug(column.titleLink) }>{ column.title }</Link>
              :
              column.titleLinkType === 'linkExternal' ?
                <a href={ column.titleLink } target='_blank' rel='noreferrer'>{ column.title }</a>
                :
                column.titleLinkType === 'linkEmail' ?
                  <a href={ `mailto:${ column.titleLink }` }>{ column.title }</a>
                  :
                  column.title
        }
        {
          windowWidth < 768 &&
          <button className='block col-span-1 text-right' onClick={ () => setColumnIsActive(!columnIsActive) }>
            { columnIsActive ? '-' : '+' }
          </button>
        }
      </h2>
      {
        (windowWidth >= 768 || columnIsActive) &&
        column?.links?.map((link, index) => (
          link?._type === 'linkInternal' ?
            <Link className='block' key={ index } href={ createLinkInternalSlug(link) }>{ link.title }</Link>
            :
            link?._type === 'linkExternal' ?
              <a className='block' key={ index } href={ link.url } target='_blank' rel='noreferrer'>{ link.title }</a>
              :
              link?._type === 'linkEmail' ?
              <a className='block' key={ index } href={ `mailto:${ link.email }` }>{ link.title }</a>
          : ''
        ))
      }
    </div>
  );
};

export default FooterColumn;