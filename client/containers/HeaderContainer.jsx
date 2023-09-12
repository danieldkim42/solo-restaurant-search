import React from 'react';
import styles from './headerStyle.module.css';

const HeaderContainer = () => {
  



  return (
    <header>
      <h1>NELP</h1>
      <div id='locations'>
        <select name='location' id='location'>
          <option>1234 Thomas Ln Seattle, WA</option>
        </select>
        <div>test 2</div>
      </div>
      <div>element 3</div>
    </header>
  )
}

export default HeaderContainer;