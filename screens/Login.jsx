import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session) {
      router.push(redirect ?? '/main');
    }
  }, []);

  const handleAuth = async (e, providerID) => {
    e.preventDefault();

    try {
      const { error, status } = await signIn(providerID, {
        callbackUrl: redirect ?? '/main',
      });

      if (error) {
        console.error('signIn error: ', error, ' status: ', status);
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 m-5 mt-20">
      {!session && (
        <button
          className="primary-button m-2 text-lg"
          onClick={(e) => handleAuth(e, 'google')}
        >
          SignIn with Google
        </button>
      )}
      <Link href={'/'}>
        <a className="text-white">Go to Main</a>
      </Link>
    </div>
  );
};

export default Login;
