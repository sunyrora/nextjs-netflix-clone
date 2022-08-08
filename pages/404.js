import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PageNotFound = () => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const countdouwn = () => {
      if (count > 0) {
        setCount((prev) => prev - 1);
      }
    };

    const interval = setInterval(countdouwn, 1000);
    if (count <= 0) {
      clearInterval(interval);
      router.push('/');
    }

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div className="relative flex flex-col justify-center items-center text-center mt-40">
      <div className="text-3xl">404 - Page Not Found</div>
      <div className="text-2xl">Redirect to Home...{count}</div>
    </div>
  );
};

export default PageNotFound;
