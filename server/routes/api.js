const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE
router.get('/', controller.getRestaurants, (req,res) => {
  return res.status(200).json(res.locals.restaurants);
});

module.exports = router;
