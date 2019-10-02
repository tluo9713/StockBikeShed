const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));

//Error handling for if there is an invalid request.
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});
module.exports = router;
