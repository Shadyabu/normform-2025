import { useCallback, useState } from 'react';
// import { useRouter } from 'next/router';

export default function LoginForm({ setActiveForm }) {

  const [ formState, setFormState ] = useState({
    errors: {},
    isDirty: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
  });
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = useCallback(
    () => { }, []
    // async (formData) => {
    //   const response = await callLoginApi(formData);

    //   if (response.error) {
    //     setError('serverError', {
    //       message:
    //         'Sorry, we did not recognize either your email or password. Please try again or create a new account.',
    //       type: 'custom',
    //     });
    //     return;
    //   }
    // },
    // [navigate, setError],
  );

  return (
    <div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          handleLogin();
        } }
      >
        {/* Form error */}
        {errors?.serverError?.message && (
          <div className='form__error'>
            <p>{errors.serverError.message}</p>
          </div>
        )}

        {/* Email */}
        <input
          autoComplete='email'
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          label='Email address'
          type='email'
          placeholder='email address'
          className='block w-full px-2 focus:outline-none focus:font-bold border-t border-black'
        />

        {/* Password */}
        <input
          autoComplete='current-password'
          // disabled={ isSubmitting || isSubmitSuccessful }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          // error={ errors.password?.message }
          label='Password'
          type='password'
          placeholder='password'
          className='block w-full px-2 focus:outline-none focus:font-bold border-t border-black'
      />

        <div className='border-t border-t-black w-full flex items-center justify-center p-2'>
          <input
            className='rounded-full bg-black border border-black text-white w-auto block px-8 cursor-pointer mouse:hover:bg-white mouse:hover:text-black transition-colors duration-300 ease-in-out'
            type='submit'
            value={ isSubmitting || isSubmitSuccessful ? 'logging in...' : 'login' }
          />
        </div>
      </form>

      <div className='my-2 text-center w-full'>
        <button className='block mx-auto' onClick={() => setActiveForm('register')}>
          register
        </button>

        <button className='block mx-auto opacity-50' onClick={() => setActiveForm('recoverPassword')}>
          Forgot password?
        </button>
      </div>
    </div>
  );
}

// export async function callLoginApi({
//   email,
//   password,
// }) {
//   try {
//     const res = await fetch(`/api/account/login`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({email, password}),
//     });
//     if (res.ok) {
//       return {};
//     } else {
//       return res.json();
//     }
//   } catch (error) {
//     return {
//       error:
//         (error instanceof Error)?.toString() || 'An unknown error has occurred',
//     };
//   }
// }
