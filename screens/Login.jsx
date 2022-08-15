import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import BackgroundImage from '../components/BackgroundImage';
import { classNames } from '../utils/utils';
import { useForm } from "react-hook-form";
import InputFeild from '../components/login/InputFeild';
import { ERROR_USER_EXIST, LOGIN_ERROR_INVALID_PASSWORD, LOGIN_ERROR_USER_NOT_EXIST } from '../utils/errorMessages';
import { useMutation } from '@apollo/client';
import { MUTATION_CREATE_USER } from '../db/graphql/mutaions';
import useFetch from '../components/hooks/useFetch';

const Login = ({bgImg}) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  const { register, handleSubmit, getValues: getFormValues, setError: setFormError, formState: { errors } } = useForm();
  const [createUser] = useMutation(MUTATION_CREATE_USER);

  const { data: fetchedData, status: fetchStatus, error: fetchError, startFetch } = useFetch({});

  useEffect(() => {
    console.log('login........');
    // if (session) {
    //   router.push(redirect ?? `${process.env.contentsBasePath}`);
    // }
  }, []);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [session]);


  const handleAuth = async (e, providerID) => {
    e.preventDefault();

    try {
      const { error, status, ok } = await signIn(providerID, {
        callbackUrl: redirect ?? `${process.env.contentsBasePath}`,
      });

    } catch (error) {
      console.error('Login error: ', error);
    }
  };

  const requestCreateUser = async ({ email, password, provider='credentials', image="" }) => {
    try {
      const input = {
        email, password, provider, image
      }

      // console.log('requestCreateUser: input: ', input);
      const { data } = await createUser({ variables: { input } });

      console.log('createUser res: ', data);
      return data;
      
    } catch (error) {
      console.log('createUser error: ', error);
      if(error.statusCode === 409) {
        switch(error) {
            case ERROR_USER_EXIST: {
              return onSubmit({ email, password });
            }
          }
      }
    }
  }

  const handleCreateAccount = async (e) => {
    try {
      const [email, password] = getFormValues(['email', 'password']);
      // console.log('handleCreateAccount: email, pssword: ', email, password);

      // const res = await requestCreateUser({ email, password });
      // console.log('handleCreateAccount res: ', res);
      if(!startFetch) {
        throw new Error('register request failed');
      }

      const result = await startFetch({ 
        fetchUrl: '/api/auth/register',
        request: {
          input: { email, password },
        },
      });

      console.log('create account result: ', result);

      if(!result?.success) {
        if(result?.error?.statusCode === 409) { // USER_ALREAD_EXIST
          return onSubmit({email, password});
        }
      }

    } catch (error) {
      console.error('createAccount error: ', error);
    }
    
  }

  
  const onSubmit = async ({email, password}) => {
    try {
      const { status, error, ok } = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      
      console.log('signin status: ', status, 'error: ', error);
      if(!ok) {
        if(status === 401) {
          switch(error) {
            case LOGIN_ERROR_USER_NOT_EXIST:
              {
                setFormError('email', {
                  type: 'custom',
                  message: 'No account with this email.',
                });
              }
              break;
              case LOGIN_ERROR_INVALID_PASSWORD: {
                setFormError('password', {
                  type: 'custom',
                  message: "Password doesn't match",
                });
              }
            }
          }
        }
        
      } catch (error) {
        console.log('sign in errror: ', error);
      }
    }
    
  const handleCredentialAuth = handleSubmit(onSubmit);

  return (
    <div className={classNames(
      `relative flex flex-col items-center justify-center w-full h-[100vh]`,
      // 'border-2 border-pink-600'
    )}>
      <div className="fixed inset-0 pt-5 mx-11">
        <Link href="/">
          <div className="w-fit hover:cursor-pointer">
            <svg
              viewBox="0 0 111 30"
              className="flex fill-[#e50914] w-[108px] md:w-[134px]"
              aria-hidden="true"
              focusable="false"
            >
              <g id="netflix-logo">
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </g>
            </svg>
          </div>
        </Link>
      </div>
      <BackgroundImage bgImg={bgImg}
        imgClassName = "object-cover w-full h-full" 
        imgProps = {
          {
            sizes: '100vw',
            fill: "true"
          }
        } 
      />
      <div className="relative bg-black/75 w-[450px] h-[660px] mt-20">
        <div className={classNames(
        `relative flex flex-col items-start justify-start w-full h-full px-[68px] pt-[60px] pb-[40px]`,
        // 'border-2 border-orange-600'
        )}>
          <div className="flex flex-col items-between w-full h-full">
            <h1 className='text-4xl font-semibold mb-[28px]'>Sign In</h1>
            <form id="login-form"
             onSubmit={handleCredentialAuth}
             className="flex flex-col space-y-4 w-full">
              <InputFeild 
                type = "text"
                id = "email"
                label = "Email or phone number"
                name = "email"
                placeholder="Email"
                autoFocus = {true}
                {...register('email', {
                required: 'Please enter your email adress',
              })}
              />
              {errors.email && (
                <div className="form-error-message">{errors.email.message}</div>
              )}
              <InputFeild 
                type = "password"
                id = "password"
                label = "Password"
                name = "password"
                placeholder="Password"
                {...register('password', {
                required: 'Please enter pasword',
              })}
              />
              {errors.password && (
                <div className="form-error-message ">{errors.password.message}</div>
              )}
              <button 
                type = "submit"
                className="rounded bg-[#e50914] text-[1rem] w-full h-[50px]">
                  Sign In
              </button>
            </form>
          </div>

          <div className = "flex flex-col items-center gap-y-2 w-full">
            <button
              className = "rounded bg-[#333]/60 hover:bg-[#333] text-[1rem] w-full h-[50px]"
              onClick = {handleCreateAccount}
            >
              Create an account
            </button>
            <button
              className = "rounded bg-[#333]/60 hover:bg-[#333] text-[1rem] w-full h-[50px]"
              onClick = {(e) => handleAuth(e, 'google')}
            >
              SignIn with Google
            </button>
            <Link href={'/'}>
              <a className="text-white text-sm">Go to Main</a>
            </Link>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default Login;
