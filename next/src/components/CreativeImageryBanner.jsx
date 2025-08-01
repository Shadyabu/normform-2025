import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const CreativeImageryBanner = ({ creativeImagery, height }) => {

  const { windowWidth } = useSiteGlobals();

  return (
    <div
      className='flex w-full max-sm:flex-wrap max-sm:h-auto sm:h-[40vh] border-t border-b border-t-[black] border-b-[black] overflow-hidden'
      style={ {
        border: '1px solid black',
        borderLeft: 'none',
        borderRight: 'none',
        height: height ?? undefined,
      } }>
      {
        creativeImagery?.map((item, index) => (
          <img
            key={ index }
            src={ item.url }
            alt={ item.alt }
            className='block sm:h-full w-full object-cover max-sm:border-b max-sm:border-b-black max-sm:last:border-b-0 sm:border-r sm:border-r-black sm:last:border-r-0'
            style={ {
              maxWidth: windowWidth >= 768 ? `${ 100 / creativeImagery.length }%` : '100%',
            } }
          />
        ))
      }
    </div>
  )
}

export default CreativeImageryBanner;