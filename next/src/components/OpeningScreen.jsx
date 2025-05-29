import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import MainLogo from './MainLogo';
import ThePassionsAgencyScriptSvg from './ThePassionsAgencyScriptSvg';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const OpeningScreen = () => {

  const { stage } = useSiteGlobals();
  const router = useRouter();

  return (
    <AnimatePresence>
      {
        stage < 2 &&
        router.asPath === '/' &&
        <motion.div
          key='opening-screen'
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          className='w-screen h-screen flex items-center justify-center'
        >
          <div className='max-w-[90vw] w-[320px] h-auto'>
            <MainLogo />
            <ThePassionsAgencyScriptSvg isVisible={ stage > 0 } />
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default OpeningScreen;