import { useCallback, useEffect, useState } from 'react';

const useFetch = (url, requestData = null, shouldStart = false) => {
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
    console.log('startFetch: request: ', request);
    return new Promise((resolve, reject) => {
      if (status === 'pending' || data) {
        resolve(data);
        return;
      }

      setFetchState('pending');

      fetchData(url, request)
        .then((res) => {
          setData(res.data);
          setFetchState(res.status);
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const fetchData = useCallback(
    (fetchUrl, request = { query: { url: '' } }) => {
      return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
          method: 'POST', // 또는 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request?.query),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(`$$$$$$$$$ fetch res: ${request?.query?.url}`, res);
            if (res.length === 0) {
              reject({
                status: 'failed',
                data: 'No videos',
              });
            }
            resolve({
              status: 'success',
              data: res,
            });
          })
          .catch((error) => {
            console.error('Fetch data error: : ', error);
            setFetchState('error', error.message);
          });
      });
    },
    []
  );

  useEffect(() => {
    shouldStart && requestData && startFetch(requestData);
  }, []);

  return { data, status, error, startFetch };
};

export default useFetch;
