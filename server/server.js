const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;


/**
 * require routers
 */

/**
 * handle parsing request body
 */
app.use(express.json());

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;