import { useCallback, useEffect, useState } from 'react';

const useFetch = ({ url, requestData = null, shouldStart = false }) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('init');
  const [error, setError] = useState('');

  const setFetchState = useCallback(
    (status, error = '') => {
      setStatus(status);
      setError(error);
    },
    [status, error]
  );

  const startFetch = (request) => {
    // console.log('startFetch: request: ', request);
    return new Promise(async (resolve, reject) => {
      if (status === 'pending' || data) {
        resolve(data);
        return;
      }

      setFetchState('pending');
      try {
        //fetchData
        const res = await fetchData(url, request);
        setData(res.data);
        setFetchState(res.status);
        resolve(res.data);
      } catch (error) {
        setFetchState('error', error.message);
        console.log('useFetch fetchData error: ', error);
        reject(error);
      }
    });
  };

  const fetchData = useCallback((fetchUrl, request = { query: { url: '' } }) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!fetchUrl) {
          reject(new Error('Bad URL'));
          return;
        }

        const res = await fetch(fetchUrl, {
          method: 'POST', // 또는 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request?.query),
        });

        const data = await res.json();
        resolve({
          status: 'success',
          data,
        });
      } catch (error) {
        // console.error('Fetch data error: : ', error);
        setFetchState('error', error.message);
        reject(error);
      }
    });
  }, []);

  useEffect(() => {
    shouldStart && requestData && startFetch(requestData);
  }, []);

  return { data, status, error, startFetch };
};

export default useFetch;
