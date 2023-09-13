import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Restaurant from './Restaurant.jsx';
import styles from './restaurantsDisplayStyle.module.css';

const RestaurantsDisplay = () => {
  // const token = '_ojxBw9f639EK0Z3AE_nHDE1sirx1swhgFFHFykZ_wLfo4DIq3OxKui5wf5Dj3ZON0knJDf4q4amclmJ28xJTC334lwEyhJAhGDAVbXt5_cvn_Ui_uE1L7TJXe0AZXYx';
  const dispatch = useDispatch();

  const array = [];
  const restaurantList = useSelector(state => state.restaurants.restaurantList);
  
  if(restaurantList.length > 0) {
    console.log("restaurant list length is greater than 0");
    for(let i = 0; i < restaurantList.length; i++) {
      array.push(<Restaurant index={i} restaurant = {restaurantList[i]}/>);
    }
  }

  return (
    <div className={styles.box}>
      {array}
    </div>
  );
}

export default RestaurantsDisplay;