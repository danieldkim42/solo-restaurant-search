import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locationList: ['firstLocation','secondLocation'],
  newLocation: ''
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.locationList.push(state.newLocation);
      state.newLocation = '';
    },
    setNewLocation: (state, action) => {
      state.newLocation = action.payload;
    },
    updateLocation: (state, action) => {
      for(let i = 0; i < state.locationList.length; i++) {
        if(state.locationList[i] === action.payload) {
          state.locationList[i] = state.newLocation;
          state.newLocation = '';
        }
      }
    },
    deleteLocation: (state, action) => {
      for(let i = 0; i < state.locationList.length; i++) {
        if(state.locationList[i] === action.payload) {
          state.locationList.splice(i,1);
        }
      }
    }
  }
})

export const { addLocation, setNewLocation, updateLocation, deleteLocation } = locationSlice.actions;

export default locationSlice.reducer;