import React from 'react';
import styles from './headerStyle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, setNewLocation, updateLocation, deleteLocation } from '../reducers/locationSlice';

const HeaderContainer = () => {
  const locationList = useSelector(state => state.locations.locationList);
  const locationDrop = [];
  for(let i = 0; i < locationList.length; i++) {
    locationDrop.push(<option>{locationList[i]}</option>);
  }
  const dispatch = useDispatch();
  const dispatchAddLocation = () => {
    dispatch(addLocation());
  }
  const dispatchSetNewLocation = (e) => {
    dispatch(setNewLocation(e.target.value));
  }
  const dispatchUpdateLocation = () => {
    const dropDown = document.getElementById('locationDrop');
    dispatch(updateLocation(dropDown.value));
  }
  const dispatchDeleteLocation = () => {
    const dropDown = document.getElementById('locationDrop');
    dispatch(deleteLocation(dropDown.value));
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
        <button className={styles.searchButton}>search</button>
        <button onClick={dispatchDeleteLocation} className={styles.deleteButton}>delete</button>
        <button onClick={dispatchAddLocation} className={styles.addButton}>add</button>
        <button onClick={dispatchUpdateLocation} className={styles.updateButton}>update</button>
      </div>
    </header>
  )
}

export default HeaderContainer;