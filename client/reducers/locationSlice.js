import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationList: ['Fullerton,CA','200 N Spring St, Los Angeles, CA 90012'],
  newLocation: '',
  user: ''
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLocationList: (state, action) => {
      state.locationList = action.payload;
    },
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

export const { setUser, setLocationList, addLocation, setNewLocation, updateLocation, deleteLocation } = locationSlice.actions;

export default locationSlice.reducer;