import React from 'react';
import styles from './restaurantStyle.module.css'

const Restaurant = (props) => {

  return (
    <div className={styles.box}>
      <img id={styles.img} src={props.restaurant.image_url}/>
      <div className={styles.info}>
        <h3>{props.index}. {props.restaurant.name}</h3>
        <p className={styles.paragraph}>Rating: {props.restaurant.rating}, Reviews: {props.restaurant.review_count}</p>
        <p className={styles.paragraph}>{props.restaurant.price}</p>
      </div>
    </div>
  );
}

export default Restaurant;