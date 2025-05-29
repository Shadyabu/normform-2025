import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import PortableTextBlocks from '@/components/blocks/PortableTextBlocks';

const CustomForm = ({ status, onValidated, textContent, emailFieldPlaceholder, submitButtonText, successMessage, errorMessage, consentStatement, formId }) => {
  const { siteGlobals } = useSiteGlobals();

  const [ isSignedUp, setIsSignedUp ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ optIn, setOptIn ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ processing, setProcessing ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
    optIn === true &&
      email.indexOf('@') > -1 && email.indexOf('.') > -1 &&
    onValidated({
      EMAIL: email,
    });
  }
  
  useEffect(() => {
    if (status === 'success') {
      setEmail('');
      setOptIn(false);
      setError(false);
      setSuccess(true);
      setIsSignedUp(true);
      setProcessing(false);
    } else if (status === 'error') {
      setError(true);
      setSuccess(false);
      setProcessing(false);
    } else if (status === 'sending') {
      setProcessing(true);
      setSuccess(false);
    }
  }, [ status, setIsSignedUp ]);
  
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  
  if (success || isSignedUp) {
    return (
      <motion.div { ...variants }>
        <p className='mb-4'>{ successMessage ?? 'Thanks for signing up!' }</p>
      </motion.div>
    );
  } else if (processing) {
    return (
      <motion.div
        { ...variants }
      >
        <p className='p-2 mt-4 mb-4 w-full'>Sending…</p>
      </motion.div>
    );
  } else {
    return (
      <motion.form
        { ...variants }
        className='w-full'
        onSubmit={ handleSubmit }
        action={ formId }
      >
        <div>
          {
            error === true ?
            <p className='mt-8 w-full'>{ errorMessage ?? 'Something went wrong! Try again?' }</p>
            :
            <div className='rich-text'>
              {
                textContent?.length > 0 &&
                <PortableTextBlocks value={ textContent } />
              }
            </div>
          }
        </div>
        <div className='w-full'>
          <label htmlFor='email' className='hidden'>Email</label>
          <input
            type='email'
            placeholder={ emailFieldPlaceholder ?? 'Enter email' }
            className='w-full rounded-0 border-b border-b-black text-title antialiased my-4 placeholder:text-black focus:outline-none duration-300'
            name='email'
            id='email'
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <button
            className='w-full px-2 mt-2 rounded-[24px] sm:rounded-[32px] text-white antialiased bg-black border border-black mouse:hover:bg-white mouse:hover:text-black mouse:hover:font-normal focus:outline-none transition-bg-opacity duration-300'
            type='submit'
          >
            { submitButtonText ?? 'Subscribe' }
          </button>
        </div>
        {
          <div className='mt-2 flex'>
            <label htmlFor='optin' className='flex items-start mr-2 mt-4 group'>
              <input
                name='optin'
                id='optin'
                type='checkbox'
                checked={ optIn }
                onChange={ () => setOptIn(!optIn) }
                required={ true }
                className='checked:bg-black border border-black rounded-full w-4 h-4 mr-2 min-w-[1rem] cursor-pointer transition-bg duration-200 mouse:group-hover:bg-black'
                style={ {
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                } }
              /> 
              <span className='block'>{ consentStatement ?? 'I consent to my email being stored by NORMFORM' }</span>
            </label>
          </div>
        }
      </motion.form>
    );
  }
};

// use the render prop and your custom form
const SignUpForm = () => {

  const { siteGlobals, signupFormIsActive, setSignupFormIsActive } = useSiteGlobals();

  return (
    <AnimatePresence initial={ false }>
      {
        signupFormIsActive &&
        siteGlobals?.signupFormData &&
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          className='z-[1000] fixed top-0 left-0 w-screen h-screen p-4 flex justify-center items-center bg-black bg-opacity-80'
        >
          <button
            className='absolute top-0 right-0 w-screen h-screen z-[2]'
            onClick={ () => setSignupFormIsActive(false) }
            aria-label='Close sign up form'
          />
          <div className='w-full h-auto max-w-[480px] flex items-center justify-center z-[3] overflow-y-scroll bg-white rounded-3xl p-4 pt-8 relative'>
            <button
              className='top-4 right-4 absolute w-[30px] h-[30px] rotate-45'
              onClick={ () => setSignupFormIsActive(false) }
              aria-label='Close sign up form'
            >
              <div className='w-[30px] h-[1px] bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
              <div className='w-[1px] h-[30px] bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
            </button>
            <MailchimpSubscribe
              url={ siteGlobals?.signupFormData?.formId ?? `` }
              render={ ({ subscribe, status, message }) => (
                <AnimatePresence mode='wait'>
                  <CustomForm
                    key={ status }
                    status={ status }
                    message={ message }
                    onValidated={ formData => {
                      subscribe(formData);
                    } }
                    { ...siteGlobals.signupFormData }
                  />
                </AnimatePresence>
              ) }
            />
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
};

export default SignUpForm;