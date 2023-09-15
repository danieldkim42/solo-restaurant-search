const cookieController = {};

/**
* setCookie - set a cookie with a random number
*/
// cookieController.setCookie = (req, res, next) => {
//   res.cookie('secret', Math.random() * 100)
//   return next();
// }

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  const userId = res.locals.ssid;
  res.cookie('ssid', userId);
  return next();
}

cookieController.test = (req, res) => {
  console.log('test success');
  return next();
}

module.exports = cookieController;
