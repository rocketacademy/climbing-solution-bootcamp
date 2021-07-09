import axios from 'axios';
import React, { useReducer } from 'react';

// State & dispatch.
export const initialState = {
  trips: [],
  routes: [],
  isModalOpen: false,
  modalContent: '',
  tripNumber: null,
};

const LOAD_TRIPS = 'LOAD_TRIPS';
const LOAD_ROUTES = 'LOAD_ROUTES';
const ADD_ROUTE = 'ADD_ROUTE';
const NO_VALUE = 'NO_VALUE';
const CLOSE_MODAL = 'CLOSE_MODAL';
const REMOVE_ROUTE = 'REMOVE_ROUTE';
const ADD_DIFFICULTY = 'ADD_DIFFICULTY';
const TRIP_NUMBER = 'TRIP_NUMBER';

export function tripReducer(state, action) {
  switch (action.type) {
    case LOAD_TRIPS:
      return {
        ...state, 
        trips: action.payload
      }

    case LOAD_ROUTES:
      
      return {
        ...state, 
        routes: action.payload,
      }

    case ADD_ROUTE:
      return {
        ...state,
        routes: [...state.routes, action.payload],
        isModalOpen: true,
        modalContent: 'route added',
      }

    case REMOVE_ROUTE:
      return {
        ...state,
        routes: state.routes.filter((route) => route.id !== action.payload)
      }


    case ADD_DIFFICULTY:
      state.routes[action.payload.id].difficulty = action.payload.difficulty;

      return {
        ...state,
      }

    case CLOSE_MODAL:
      return {
        ...state, 
        isModalOpen: false
      }

    case NO_VALUE:
      return {
        ...state,
        isModalOpen: true,
        modalContent: 'please enter a route'
      };

    case TRIP_NUMBER:
      return {
        ...state,
        tripNumber: action.payload
      }

    default:
      return state;
  }
}

// Action creators (passed to dispatch)
export function loadTripsAction(trips) {
  return {
    type: LOAD_TRIPS,
    payload: trips,
  }
}

export function loadRoutesAction(routes) {
  return {
    type: LOAD_ROUTES,
    payload: routes,
  }
}

// Provider
export const TripContext = React.createContext(null);
const { Provider } = TripContext;

export function TripProvider({children}) {
  const [store, dispatch] = useReducer(tripReducer, initialState);

  return <Provider value={{store, dispatch}}> {children} </Provider>
}


export function getSelectedTrip(tripNum) {
  console.log('inside get selected trip');
  return {
    type: TRIP_NUMBER,
    payload: tripNum
  }
}
// Requests
const BACKEND_URL = 'http://localhost:3004'
export const difficulty = [1, 2, 3, 4, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15];

// update difficulty level of routes
export const updateDifficulty = (routeId, routeDifficulty) => {
  axios
    .post(BACKEND_URL + '/addDifficulty', {
      routeId: routeId,
      difficulty: routeDifficulty
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
}

// add a new route to the database
export const addNewRoute = (dispatch, name) => {
  axios
    .post(BACKEND_URL + '/addRoute', {
      name: name,
      tripId: 1})
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error))
}

// get all available routes for a particular trip
export const loadRoutes = (dispatch, tripNumber) => {
  axios
    .get(BACKEND_URL + `/routes/${tripNumber}`)
    .then((response) => {
      const routes = response.data.tripRoutes;
      dispatch(loadRoutesAction(routes));
    })
    .catch((error) => console.log(error));
}

export function loadTripList(dispatch) {
  axios.get(`${BACKEND_URL}/gettrips`)
  .then(res => {
    const trips = res.data;
    console.log('trips', trips);
    dispatch(loadTripsAction(trips));
  });
} 

