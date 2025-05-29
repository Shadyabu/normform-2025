import Link from 'next/link';
import CTAMarquee from './CTAMarquee';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { Suspense } from 'react';

function CtaMarqueeElement({ text, action, linkInternal, linkExternal }) {

  const { setSignupFormIsActive } = useSiteGlobals();
  
  return (
    <Suspense fallback={ null }>
      <div className='border-t border-t-black w-full h-8'>
        {
          action === 'externalLink' &&
          <a
            href={ linkExternal.url }
            target={ '_blank' }
            rel='noreferrer'
            className=''
          >{ text ?? 'NORMFORM' }</a>
        }
        {
          action === 'internalLink' && linkInternal.slug &&
          <Link href={ linkInternal.slug } className=''>
            <CTAMarquee text={ text ?? 'NORMFORM' } />
          </Link>
        }
        {
          action === 'mailchimpSignupForm' &&
          <button
            className=''
            onClick={ () => setSignupFormIsActive(true) }
          >
            <CTAMarquee text={ text ?? 'NORMFORM' } />
          </button>
        }
        {
          (!action || action === 'none') &&
          <CTAMarquee text={ text ?? 'NORMFORM' } />
        }
      </div>
    </Suspense>
  );
};

export default CtaMarqueeElement;