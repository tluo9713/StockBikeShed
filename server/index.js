const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//alternatively you can do
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

app.use('/api', require('./api-routes'));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/index'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('knock, knock');
  console.log('whos there?');
  console.log(`your server is listening on port ${port}`);
});
