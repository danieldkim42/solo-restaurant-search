import React, { useEffect } from 'react';
import HeaderContainer from './containers/HeaderContainer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLocationList } from './reducers/locationSlice';
import { Cookies } from 'react-cookie';

const App = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  
  dispatch(setUser(cookies.get('ssid')));

  const userId = useSelector(state => state.locations.user);
  console.log('userId', userId);
  async function dispatchSetUser() {
    const result = await fetch('/home/users/' + userId).then(data => data.json());
    console.log(result);
    dispatch(setLocationList(result.locations));
  }

  dispatchSetUser();

  return(
    <div>
      <HeaderContainer/>
      <MainContainer/>
    </div>
  );
}

export default App;