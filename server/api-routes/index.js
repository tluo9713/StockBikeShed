const router = require('express').Router();

//users not implemented
router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
//add more routes as needed

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});
module.exports = router;
