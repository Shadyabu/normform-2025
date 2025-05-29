import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { AnimatePresence, motion } from 'framer-motion';


const HeaderIconCart = ({ item, activeDropdown, setActiveDropdown }) => {

  const { cartNumber } = useSiteGlobals();

  return (
    <button
      className='relative block group cursor-pointer'
      onClick={ () => {
        if (activeDropdown !== item.name) {
          setActiveDropdown(item.name);
        } else {
          setActiveDropdown(null);
        }
      } }
    >
      <AnimatePresence mode='wait' initial={ false }>
        <motion.img
          key={ 'trolley' + cartNumber }
          initial={ { scale: 0, rotate: -360 } }
          animate={ { scale: 1, rotate: 0 } }
          exit={ { scale: 0, rotate: 360 } }
          src={ `/assets/icons/${ item.src }.png` }
          className='block w-auto h-5 mouse:group-hover:opacity-50 transition-opacity'
          alt={ item.alt }
        />
      </AnimatePresence>
      <AnimatePresence mode='wait' initial={ false }>
        <motion.div
          key={ 'cartNumber' + cartNumber }
          initial={ { scale: 0, y: '-100%', } }
          animate={ { scale: 1, y: 0, } }
          exit={ { scale: 0, y: '100%', } }
          className='absolute -top-1 -right-1 w-3 h-3 text-sm bg-black text-white text-xs flex justify-center items-center rounded-full !font-normal'
        >
          { cartNumber }
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default HeaderIconCart;