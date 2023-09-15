import React from 'react';
import styles from './headerStyle.module.css';
import { setList } from '../reducers/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, setNewLocation, updateLocation, deleteLocation } from '../reducers/locationSlice';

const HeaderContainer = () => {
  const locationList = useSelector(state => state.locations.locationList);
  const locationDrop = [];
  for(let i = 0; i < locationList.length; i++) {
    locationDrop.push(<option>{locationList[i]}</option>);
  }

  const dispatch = useDispatch();
  async function dispatchSearch() {
    const dropDown = document.getElementById('locationDrop');
    const query = {
      limit: 50,
      location: dropDown.value,
    };
    let queryString = '?';
    for(const param in query) {
      queryString+=`${param}=${query[param]}&`;
    }
    queryString = queryString.slice(0,-1);
    console.log(queryString);
    const result = await fetch('/api/' + queryString).then(data => data.json());
    dispatch(setList(result));
  }

  const user = useSelector(state => state.locations.user);

  const dispatchSetNewLocation = (e) => {
    dispatch(setNewLocation(e.target.value));
  }

  async function dispatchAddLocation() {
    dispatch(addLocation());
    const locationInput = document.getElementById('locationInput');
    console.log(locationInput.value);
    let string = locationInput.value;
    const result = await fetch('/home/users/' + user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([locationInput.value])
    })
  }
  async function dispatchUpdateLocation() {
    const dropDown = document.getElementById('locationDrop');
    const locationInput = document.getElementById('locationInput');
    const result = await fetch('/home/users/' + user, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([dropDown.value, locationInput.value])
    })
    dispatch(updateLocation(dropDown.value));
  }
  async function dispatchDeleteLocation() {
    const dropDown = document.getElementById('locationDrop');
    const value = dropDown.value;
    const result = await fetch('/home/users/' + user, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([value])
    })
    dispatch(deleteLocation(value));
  }

  return (
    <header id={styles.header}>
      <h1>NELP</h1>
      <div id={styles.locations}>
        <select name='locationDrop' id='locationDrop' className={styles.select}>
          {locationDrop}
        </select>
        <label htmlFor="locationInput" className={styles.locationLabel}>New Location: </label>
        <input
          type="text"
          id="locationInput"
          name="locationInput"
          className={styles.locationInput}
          onChange={(e) => dispatchSetNewLocation(e)}
        ></input>
      </div>
      <div id={styles.buttons}>
        <button onClick={dispatchSearch} className={styles.searchButton}>search</button>
        <button onClick={dispatchDeleteLocation} className={styles.deleteButton}>delete</button>
        <button onClick={dispatchAddLocation} className={styles.addButton}>add</button>
        <button onClick={dispatchUpdateLocation} className={styles.updateButton}>update</button>
      </div>
    </header>
  )
}

export default HeaderContainer;