import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useMemo } from 'react';
const BuyNowButtonOptions = ({ variant, onVariantChange }) => {

 

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

console.log('variant.values.length',variant.values.length)
  if(variant.values.length === 1){
    return(
      <div className='w-full border-b border-black'>
      <fieldset className='w-full flex py-3 px-2'>
        <legend className='hidden'>{ variant.name }</legend>
        {
          variant.values?.map((value, index) => (
            <label
              className={ `relative block cursor-pointer text-center flex justify-center items-center mr-4 last:mr-0 h-5 w-5 rounded-[50%] border border-black transition-transform transition-rounded duration-[600ms] ${ variant.active === value.value ? 'rotate-45 scale-[0.8] rounded-none' : 'rotate-0 scale-1 mouse:hover:rotate-45 mouse:hover:scale-[0.8] mouse:hover:rounded-none' }` }
              htmlFor={ value.value }
              key={ value.value + ' ' + index }
              style={ {
                backgroundColor: colors[ index ] ?? 'transparent',
                transition: 'transform 0.3s 0.3s ease, border-radius 0.3s ease',
              } }
            >
              <input
                className='absolute opacity-0 border-none rounded-0 w-full h-full cursor-pointer'
                type='radio'
                name={ value.value }
                checked={ variant.active === value.value ? true : false }
                onChange={ (event) => {
                  if (event.target.checked) {
                    const newVariants = [ ...variants ];
                    const thisVariant = newVariants.find((v) => v.name === variant.name);
                    thisVariant.active = value.value;
                    setVariants(newVariants);
                  }
                } }
              />
              <span className='block relative text-center pointer-events-none hidden'>
                { value.text }
              </span>
            </label>
          ))
        }
      </fieldset>
    </div> 
    )
  }

  return (
    <div className='w-full border-b border-black'>
      <fieldset className='w-full flex'>
        <legend className='hidden'>{ variant.name }</legend>
        {
          variant.values?.map((value, index) => (
            <label
            className={ `relative block cursor-pointer text-center flex justify-center items-center w-full h-8 border-r last:border-r-0 border-black ${ variant.active === value.value ? 'bg-black text-white' : 'bg-white text-black mouse:hover:bg-black mouse:hover:text-white' }` }
            htmlFor={ value.value }
            key={ value.value + ' ' + index }
            >
              <input
                className='absolute opacity-0 border-none rounded-0 w-full h-full cursor-pointer option-input'
                type='radio'
                name={ variant.name }
                id={ `${variant.name}-${value.value}` }
                checked={ variant.active === value.value }
                onChange={ (event) => {
                  if (event.target.checked) {
                    onVariantChange(variant.name, value.value);
                  }
                } }
              />
              <span className='block relative text-center pointer-events-none'>
                { value.text }
              </span>
            </label>
          ))
        }
      </fieldset>
    </div>
  );
};

export default BuyNowButtonOptions;