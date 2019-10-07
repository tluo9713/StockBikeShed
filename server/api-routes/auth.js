const router = require('express').Router();
const User = require('../db/models/user');

module.exports = router;

router.get('/me', (req, res, next) => {
  console.log('auth', req.session.userId);
  try {
    if (!req.session.userId) {
      const err = new Error('Not found');
      err.status = 404;
      throw err;
    }
    res.json(req.user || {});
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.session.userId = user.id;
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/logout', (req, res, next) => {
  req.session.destroy();
  req.logout();
  res.status(204).end();
});
