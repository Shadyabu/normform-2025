import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const SizingChart = () => {

  const { siteGlobals } = useSiteGlobals();

  return (
    <>
      
      {
        siteGlobals?.sizingChartData?.rows?.map((size, index) => (
          <div className='flex items-center border-b border-black w-full last:border-b-0 mouse:hover:bg-black mouse:hover:text-white' key={ index }>
            {
              size?._type === 'heading' ?
                <h3 className='uppercase text-center w-full'>{ size.heading }</h3>
                :
                <>
                  <div className='w-1/3 border-r border-black px-2'>
                    <h4 className='uppercase'>{ size.title }</h4>
                  </div>
                  {
                    size.sizes?.map((size, index) => (
                      <div className='w-1/3 border-r border-r-black last:border-r-0 px-2' key={ index }>
                        <p>{ size.measurements }</p>
                      </div>
                    ))
                  }
                </>
            }
          </div>
        ))
      }
    </>
  )
};

export default SizingChart;