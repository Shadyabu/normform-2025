import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email('Please enter a valid email'),
  })
  .required();

export default function RecoverPasswordForm({ setActiveForm }) {
  const {
    formState: {errors, isDirty, isSubmitting, isSubmitSuccessful},
    handleSubmit,
    register,
    setError,
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const handleRecover = useCallback(
    () => { },
    // async (formData) => {
    //   const response = await callAccountRecoverApi(formData);
    //   if (response.error) {
    //     setError('serverError', {
    //       message: response.error,
    //       type: 'custom',
    //     });
    //     return;
    //   }
    // },
    [],
  );

  return (
    <div>
        {isSubmitSuccessful ? (
          <>
            <p>
              If that email address is in our system, you&rsquo;ll receive an
              email with instructions on how to reset your password in a few
              minutes.
            </p>
            <div className="header__dropdown__form--login__buttons">
              <button className="button--plain" onClick={() => setActiveForm('login')}>
                back to login
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="container-fluid">
              <p className="no-vertical-margins">
                Enter your email address to receive a password reset link.
              </p>
            </div>
            <form onSubmit={handleSubmit(rr)}>
              {/* Form error */}
              {errors?.serverError?.message && (
                <div className="mb-6 flex items-center justify-center rounded-sm border border-red p-4 text-sm text-red">
                  <p>{errors.serverError.message}</p>
                </div>
              )}

              <div className="space-y-12">
                <div className="space-y-4">
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
                </div>
              </div>

              <div className="header__dropdown__form--login__buttons">
                <input
                  disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                  type="submit"
                >
                  {isSubmitting ? 'Processing...' : 'Send reset link'}
                </input>
              </div>
            </form>
            <div className="header__dropdown__form--login__buttons">
              <button className="button--plain" onClick={() => setActiveForm('login')}>back to login</button>
            </div>
          </>
        )}
    </div>
  );
}

// export async function callAccountRecoverApi({
//   email,
//   password,
//   firstName,
//   lastName,
// }) {
//   try {
//     const res = await fetch(`/api/account/recover`, {
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
