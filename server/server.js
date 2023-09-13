const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;


/**
 * require routers
 */

const apiRouter = require('./routes/api');

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.static('dist'));

// app.use('/dist/bundle.js', (req,res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../dist/bundle.js'));
// });

app.use('/api', apiRouter);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
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