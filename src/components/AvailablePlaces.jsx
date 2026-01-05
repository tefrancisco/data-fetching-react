import { useState, useEffect } from 'react'
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // We need to use useEffect(), otherwise the state change will trigger an infinite loop
  useEffect(() => {
    setIsLoading(true)
    // Method provided by the browser to get and send data with HTTP requests
    // This will send a GET request to this URL
    // The fetch() method returns a promise
    fetch('http://localhost:3000/places')
    .then((response) => {
      // Extract data with the json() method, that returns another promise
      return response.json()
    }).then((resData) => {
      setAvailablePlaces(resData.places)
      setIsLoading(false)
    })

    // Same thing but using async and await:

    // async function fetchPlaces() {
    //   const response = await fetch('http://localhost:3000/places')
    //   const resData = await response.json()
    //   setAvailablePlaces(resData.places)
    // }

    // fetchPlaces()
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
