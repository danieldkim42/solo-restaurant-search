const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const controller = {};

// MIDDLEWARE TO GET MORE CHARACTER DATA
controller.getRestaurants = (req, res, next) => {
  const token = '_ojxBw9f639EK0Z3AE_nHDE1sirx1swhgFFHFykZ_wLfo4DIq3OxKui5wf5Dj3ZON0knJDf4q4amclmJ28xJTC334lwEyhJAhGDAVbXt5_cvn_Ui_uE1L7TJXe0AZXYx';
  console.log('query in controller', req.query);
  let queryString = '?';
  for(const param in req.query) {
    queryString+=`${param}=${req.query[param]}&`;
  }
  queryString = queryString.slice(0,-1);
  console.log('queryString: ', queryString);

  fetch(`https://api.yelp.com/v3/businesses/search${queryString}`, {
    headers: {Authorization: `Bearer ${token}`}
  })
    .then(data => data.json())
    .then(data => {
      res.locals.restaurants = data.businesses;
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