import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

  async function fetchSortedPlaces() {
    const places = await fetchAvailablePlaces();

    return new Promise((resolve, reject) => {             //create a promise since the useFetch function expects one
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(sortedPlaces)   //set the value from a non promise feature API into a promise feature API
      });
    });
  }
export default function AvailablePlaces({ onSelectPlace }) {
  // most common states when sending HTTP requests
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   setIsFetching(true);
  //   async function fetchPlaces() {
  //     try {
  //       const places = await fetchAvailablePlaces();
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const sortedPlaces = sortPlacesByDistance(
  //           places,
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );
  //         //when fetching location update the states in the callback function here and in the catch
  //         setAvailablePlaces(sortedPlaces);
  //         setIsFetching(false);
  //       });
  //     } catch (error) {
  //       setError({ message: error.message || "Could not fetch places" });
  //       setIsFetching(false);
  //     }
  //   }
  //   fetchPlaces();
  // }, []);

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
    // setFetchedData: setAvailablePlaces,
  } = useFetch(fetchSortedPlaces, []);




  if (error) {
    return <Error title="Error ocured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Images loading"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
