import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const CustomForm = ({ status, onValidated, successMessage, errorMessage, consentStatement, formId }) => {

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
        className='w-full px-4'
        onSubmit={ handleSubmit }
        action={ formId }
      >
        <div>
          {
            error === true &&
            <p className='mt-8 w-full'>{ errorMessage ?? 'Something went wrong! Try again?' }</p>
          }
        </div>
        <div className='w-full'>


        <label htmlFor='email' className='text-center w-full block'>sign up for early access and more info about our launch ☺</label>
        <div className='flex mt-2 mx-auto justify-center items-center'>
          <input type='email' className='block border border-black mr-2' value={ email } onChange={ (event) => setEmail(event.target.value) } />
          <button type='submit' className='block bg-black text-white rounded-full px-8'>submit</button>
        </div>
        {
          <div className='mt-2 flex'>
            <label htmlFor='optin' className='flex items-start mr-2 mt-4 group justify-center w-full text-center'>
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
        </div>
      </motion.form>
    );
  }
};

// use the render prop and your custom form
const SignUpFormHoldingPage = () => {

  const { siteGlobals } = useSiteGlobals();

  return (
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
  );
};

export default SignUpFormHoldingPage;