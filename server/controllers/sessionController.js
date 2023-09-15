const Session = require('../models/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/

sessionController.test = (req,res,next) => {
  console.log("test success");
  return next();
}

sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  console.log("made it");
  // const cookies = req.cookies;
  // Session.findOne({cookieId: cookies.ssid})
  //   .then(session => {
  //     console.log("here's the log from isLoggedIn: ", session);
  //     if (cookies.ssid === session.cookieId) {
  //       return next();
  //     } else {
  //       res.redirect('/signup');
  //     }
  //   })
  //   .catch(err => {
  //     return next({
  //       log: 'sessionController.isLoggedIn',
  //       message: 'sessionController.isLoggedIn ERROR session expired'
  //     });
  //   })
  return next();
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  //write code here
  // console.log(res.locals.ssid);
  console.log("session successfully created");
  Session.create({cookieId: res.locals.ssid})
    .then(session => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'sessionController.startSession',
        message: {err: 'sessionController.startSession ERROR: could not create session'}
      });
    })
};

module.exports = sessionController;
