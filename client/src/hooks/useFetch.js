import { useEffect, useState } from "react";

// export const useFetch = (url, options = {}, dependencies = []) => {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(url, options);
//         const responseData = await response.json();
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}, ${response.status}`);
//         }
//         setData(responseData);
//         setError();
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, dependencies);

//   return { data, loading, error };
// };

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); // start with true
  const [error, setError] = useState();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!isMounted) return;

        setData(result); // ✅ DO NOT clear data before this
      } catch (err) {
        if (!isMounted) return;
        setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
};
