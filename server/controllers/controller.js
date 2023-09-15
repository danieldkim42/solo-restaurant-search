const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const controller = {};

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// MIDDLEWARE TO GET MORE CHARACTER DATA
controller.getRestaurants = (req, res, next) => {
  const token = '_ojxBw9f639EK0Z3AE_nHDE1sirx1swhgFFHFykZ_wLfo4DIq3OxKui5wf5Dj3ZON0knJDf4q4amclmJ28xJTC334lwEyhJAhGDAVbXt5_cvn_Ui_uE1L7TJXe0AZXYx';

  let queryString = '?';
  for(const param in req.query) {
    queryString+=`${param}=${req.query[param]}&`;
  }
  queryString = queryString.slice(0,-1);

  fetch(`https://api.yelp.com/v3/businesses/search${queryString}`, {
    headers: {Authorization: `Bearer ${token}`}
  })
    .then(data => data.json())
    .then(data => {
      res.locals.restaurants = shuffle(data.businesses).slice(0,10);
      return next();
    })
    .catch((error) => {
      return next({
        method: 'getRestaurants',
        type: 'reading character data',
        message: {err: 'controller.getRestaurants: ERROR: Check server logs for details'}
      });
    });
};

// EXPORT THE CONTROLLER HERE
module.exports = controller;