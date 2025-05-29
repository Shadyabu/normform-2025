import {yupResolver} from '@hookform/resolvers/yup';
import {useCallback} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { callLoginApi } from './LoginForm';
import { useRouter } from 'next/router';

const schema = yup
  .object({
    email: yup.string().email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter a password')
      .min(5, 'Passwords must have at least 5 characters'),
    passwordRepeat: yup.string().when('password', {
      is: (field) => field.length > 0,
      then: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    }),
  })
  .required();

export default function RegisterForm({ setActiveForm }) {
  const {
    formState: {errors, isDirty, isSubmitting, isSubmitSuccessful},
    handleSubmit,
    register,
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const navigate = useRouter();

  const handleRegister = useCallback(
    // async (formData) => {
    //   const response = await callAccountCreateApi({
    //     email: formData.email,
    //     password: formData.password,
    //   });

    //   if (response.error) {
    //     setError('serverError', {
    //       message: response.error,
    //       type: 'custom',
    //     });
    //     return;
    //   }

    //   // this can be avoided if customerCreate mutation returns customerAccessToken
    //   await callLoginApi({
    //     email: formData.email,
    //     password: formData.password,
    //   });

  //   navigate('/account');
    
    () => {
    }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        {/* Form error */}
        {errors?.serverError?.message && (
          <div className="form__error">
            <p>{errors.serverError.message}</p>
          </div>
        )}

        {/* Email */}
        <input
          autoComplete="email"
          disabled={isSubmitting || isSubmitSuccessful}
          error={errors.email?.message}
          label="Email address"
          placeholder="email address"
          className="header__dropdown__form__field--text__wrapper"
          type="text"
          {...register('email')}
        />

        {/* Password */}
        <input
          disabled={isSubmitting || isSubmitSuccessful}
          error={errors.password?.message}
          label="Password"
          placeholder="password"
          className="header__dropdown__form__field--text__wrapper"
          type="password"
          {...register('password')}
        />

        {/* Password (repeat) */}
        <input
          disabled={isSubmitting || isSubmitSuccessful}
          error={errors.passwordRepeat?.message}
          label="Repeat password"
          placeholder="repeat password"
          className="header__dropdown__form__field--text__wrapper"
          type="password"
          {...register('passwordRepeat')}
        />
        <div className="header__dropdown__form--login__buttons">
          <input
            disabled={!isDirty || isSubmitting || isSubmitSuccessful}
            type="submit"
          >
              {
                isSubmitting || isSubmitSuccessful
            ? 'Creating...'
            : 'Create account'}
          </input>
        </div>
      </form>
      <div className="header__dropdown__form--login__buttons">
        <button className="button--plain" onClick={() => setActiveForm('login')}>
          back to login
        </button>
      </div>
    </div>
  );
}

// export async function callAccountCreateApi({
//   email,
//   password,
//   firstName,
//   lastName,
// }) {
//   try {
//     const res = await fetch(`/account/register`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({email, password, firstName, lastName}),
//     });
//     if (res.status === 200) {
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
