import { useState, useEffect } from 'react';

function useData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
            // console.log(json);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return data;
}

export default useData;
