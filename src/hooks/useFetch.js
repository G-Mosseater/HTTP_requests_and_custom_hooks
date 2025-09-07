import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) //initial value parameter is set as an value for the data, an array for example (if the data comes as an array)
{
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  // fetching the user selected places

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "failed to fetch data" });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);
  return { isFetching, error, fetchedData,setFetchedData };
}
