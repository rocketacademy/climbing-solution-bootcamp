import React, { useContext, useEffect, useState } from 'react';
import { loadTripList, getSelectedTrip, TripContext } from '../store';
import '../index.css';
import AddRoute from './addRoute.js';

const Trips = () => {
  const [showRoutes, setShowRoutes] = useState(false);
  const { dispatch, store } = useContext(TripContext);
  const { trips, routes } = store;
  console.log('trips', trips);
  console.log('routes', routes);

  useEffect(() => {
    loadTripList(dispatch);
  }, []);

  const handleClick = (index) => {
    console.log('insde handleclick');
    dispatch(getSelectedTrip(index + 1));
    setShowRoutes(true);
  }

  return (
    <div>
      {trips && routes.length === 0 && (
        trips.map((trip, index) => {
          return (
            <div className="trip-container">
              <button className="trip-container-button" type="button" onClick={() => handleClick(index)}>
              {trip.name}
              </button>
            </div>
          )
        })
      )}
      {showRoutes && (
        <AddRoute />
      )}
    </div>
  )

}

export default Trips;