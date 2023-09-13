import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  restaurantList: []
};

export const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setList: (state, action) => {
      // for(let i = 0; i < action.payload.length; i++) {
      //   state.restaurantList.push(action.payload[i]);
      // }
      state.restaurantList = action.payload;
      console.log('SLICE: ', state.restaurantList);
    }
  }
});

export const { setList } = restaurantSlice.actions;

export default restaurantSlice.reducer;