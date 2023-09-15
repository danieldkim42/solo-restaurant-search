const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const app = express();
const PORT = 3000;
const mongoURI = 'mongodb+srv://danieldkim42:5bbSuFHUKybPTnce@cluster0.u6trjib.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI);

/**
 * require routers
 */

const apiRouter = require('./routes/api');

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/home', express.static('dist'));
// app.use('/htmlFiles', express.static(path.resolve(__dirname, '../htmlFiles')));

// app.use('/dist/bundle.js', (req,res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../dist/bundle.js'));
// });


app.get('/home/users/:id', userController.getUser, (req,res) => {
  res.status(200).json(res.locals.user);
});
app.patch('/home/users/:id', userController.updateLocation, (req,res) => {
  res.status(200).json(res.locals);
});
app.post('/home/users/:id', userController.addLocation, (req,res) => {
  res.status(200).json(res.locals);
});
app.delete('/home/users/:id', userController.deleteLocation, (req,res) => {
  res.status(200).json(res.locals);
});
app.get('/home', cookieController.test, (req,res) => {
  res.sendFile(path.resolve(__dirname, '../htmlFiles/index.html'));
});

app.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  // what should happen here on successful sign up?
  res.status(201).redirect('/home');
});

app.get('/signup', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../htmlFiles/signup.html'));
});

app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  // what should happen here on successful log in?
  res.status(201).redirect('/home');
});

app.use('/api', apiRouter);

app.get('/', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../htmlFiles/login.html'));
});


// catch-all route handler for any requests to an unknown route
app.use((req,res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = // defaultErr object
  {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign(defaultErr, err);
  console.log('ERROR:', errorObj);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;