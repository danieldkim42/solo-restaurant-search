const User = require('../models/userModel');

const userController = {};

userController.addLocation = (req, res, next) => {
  console.log('body', req.body);
  console.log('params.id', req.params.id);
  User.findByIdAndUpdate(req.params.id, {$push: {locations: req.body[0]}}, {safe: true, upsert: true, new : true})
    .then(user => {
      console.log('added location', user.locations);
      return next();
    })
    .catch(err => {
      return next({
        log: 'userController.getUser',
        message: {err: 'userController.getUser ERROR: could not find user'}
      });
    });
};

userController.updateLocation = (req, res, next) => {
  console.log('body', req.body);
  console.log('params.id', req.params.id);
  User.findByIdAndUpdate(req.params.id, {$pull: {locations: req.body[0]}}, {safe: true, upsert: true, new : true})
    .then(user => {
      console.log('deleted location', user.locations);
      User.findByIdAndUpdate(req.params.id, {$push: {locations: req.body[1]}}, {safe: true, upsert: true, new : true})
        .then(user => {
          console.log('added location', user.locations);
          return next();
        })
        .catch(err => {
          return next({
            log: 'userController.getUser',
            message: {err: 'userController.getUser ERROR: could not find user'}
          });
        });
    })
    .catch(err => {
      return next({
        log: 'userController.getUser',
        message: {err: 'userController.getUser ERROR: could not find user'}
      });
    });
  
  // User.update({_id: req.params.id, locations: req.body[0]}, {$set:{"locations.$": req.body[1]}})
  //   .then(user => {
  //     console.log('added location', user.locations);
  //     return next();
  //   })
  //   .catch(err => {
  //     return next({
  //       log: 'userController.getUser',
  //       message: {err: 'userController.getUser ERROR: could not find user'}
  //     });
  //   });
};

userController.deleteLocation = (req, res, next) => {
  // console.log('body', req.body);
  // console.log('params.id', req.params.id);
  User.findByIdAndUpdate(req.params.id, {$pull: {locations: req.body[0]}}, {safe: true, upsert: true, new : true})
    .then(user => {
      console.log('deleted location', user.locations);
      return next();
    })
    .catch(err => {
      return next({
        log: 'userController.getUser',
        message: {err: 'userController.getUser ERROR: could not find user'}
      });
    });
};

userController.getUser = (req, res, next) => {
  // console.log(typeof req.params.id,req.params.id);
  User.findById(req.params.id)
    .then(user => {
      res.locals.user = user;
      console.log('res.locals.user', res.locals.user);
      return next();
    })
    .catch(err => {
      return next({
        log: 'userController.getUser',
        message: {err: 'userController.getUser ERROR: could not find user'}
      });
    });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
  const {username, password} = req.body;
  
  User.create({username,password})
    .then(user => {
      console.log('user', user);
      res.locals.ssid = user._id.toString();
      return next();
    })
    .catch(err => {
      return next({
        log: 'userController.createUser',
        message: {err: 'userController.createUser ERROR: could not create user'}
      });
    })
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  const {username, password} = req.body;
  User.findOne({username, password})
    .then(user => {
      if (!user) {
        res.redirect('/signup');
      } else {
        res.locals.ssid = user._id.toString();
        return next();
      }
    })
};

module.exports = userController;
