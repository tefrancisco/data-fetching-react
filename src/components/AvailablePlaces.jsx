import { useState, useEffect } from 'react'
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])

  // We need to use useEffect(), otherwise the state change will trigger an infinite loop
  useEffect(() => {
    // Method provided by the browser to get and send data with HTTP requests
    // This will send a GET request to this URL
    // The fetch() method returns a promise
    fetch('http://localhost:3000/places')
    .then((response) => {
      // Extract data with the json() method, that returns another promise
      return response.json()
    }).then((resData) => {
      setAvailablePlaces(resData.places)
    })
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
