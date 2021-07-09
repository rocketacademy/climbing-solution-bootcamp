import React from 'react';
import { TripProvider } from './store'
import Trips from './components/Trips.jsx';

export default function App() {


  return (
    <TripProvider>
      <Trips />
    </TripProvider>
  );
}
