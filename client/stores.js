import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import locationReducer from './reducers/locationSlice';
import restaurantReducer from './reducers/restaurantSlice';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
export const store = configureStore({
  reducer: {
    locations: locationReducer,
    restaurants: restaurantReducer
  }
});