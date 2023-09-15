import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Restaurant from './Restaurant.jsx';
import styles from './restaurantsDisplayStyle.module.css';

const RestaurantsDisplay = () => {
  const dispatch = useDispatch();

  const array = [];
  const restaurantList = useSelector(state => state.restaurants.restaurantList);
  
  if(restaurantList.length > 0) {
    console.log("restaurant list length is greater than 0");
    for(let i = 0; i < restaurantList.length; i++) {
      array.push(<Restaurant index={i + 1} restaurant = {restaurantList[i]}/>);
    }
  }

  return (
    <div className={styles.box}>
      {array}
    </div>
  );
}

export default RestaurantsDisplay;