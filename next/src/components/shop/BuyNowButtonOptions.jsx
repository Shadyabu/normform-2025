const BuyNowButtonOptions = ({ variant, variants, variantChanges, setVariantChanges, setVariants }) => {

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
                name={ value.value }
                checked={ variant.active === value.value ? true : false }
                onChange={ (event) => {
                  setVariantChanges(variantChanges + 1);
                  if (event.target.checked) {
                    const newVariants = [ ...variants ];
                    const thisVariant = newVariants.find((v) => v.name === variant.name);
                    thisVariant.active = value.value;
                    setVariants(newVariants);
                  } else {
                    const newVariants = [ ...variants ];
                    const thisVariant = newVariants.find((v) => v.name === variant.name);
                    thisVariant.active = null;
                    setVariants(newVariants);
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