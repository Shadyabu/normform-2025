import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useMemo } from 'react';

const ShopPageColourOptions = ({ variant }) => {

  const { siteGlobals } = useSiteGlobals();

  const colors = useMemo(() => {
    if (!siteGlobals?.colorsData) return [];
    const sanityColors = [ ...siteGlobals.colorsData ];
    for (let i = 0; i < sanityColors.length; i++) {
      const color = sanityColors[ i ];
      color.title = color.title.toLowerCase();
    }
    const colors = [];
    const colorOptions = variant.values;

    for (let i = 0; i < colorOptions.length; i++) {

      const color = sanityColors.find((color) => color.title === colorOptions[ i ].value.toLowerCase());
      if (color?.color?.hex) {
        colors.push(color.color.hex);
      } else {
        colors.push('transparent');
      }
    }

    return colors;
  }, [ siteGlobals, variant ]);

  return (
    <div className='w-full absolute bottom-2 sm:bottom-10 left-0 pointer-events-none transition-opacity duration-300 mouse:opacity-0 mouse:group-hover:opacity-100'>
      <div className='w-full flex px-2'>
        <div className='hidden'>{ variant.name }</div>
        {
          variant.values?.map((value, index) => (
            <div
              key={ index }
              className={ `relative block cursor-pointer text-center flex justify-center items-center mr-4 last:mr-0 h-5 w-5 rounded-[50%] border border-black` }
              style={ {
                backgroundColor: colors[ index ] ?? 'transparent',
              } }
            >
              <span className='block relative text-center pointer-events-none hidden'>
                { value.text }
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ShopPageColourOptions;