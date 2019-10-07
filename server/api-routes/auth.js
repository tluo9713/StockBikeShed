// const router = require('express').Router();
// const User = require('../db/models/user');
// module.exports = router;

// router.post('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: { email: req.body.email },
//     });
//     if (!user) {
//       console.log('No such user found:', req.body.email);
//       res.status(401).send('Wrong username and/or password');
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email);
//       res.status(401).send('Wrong username and/or password');
//     } else {
//       req.login(user, err => (err ? next(err) : res.json(user)));

//       // res.json(user);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// router.post('/signup', async (req, res, next) => {
//   let { email, firstName, lastName, password } = req.body;
//   try {
//     const user = await User.create({ email, firstName, lastName, password });
//     req.login(user, err => (err ? next(err) : res.json(user)));
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists');
//     } else {
//       next(err);
//     }
//   }
// });

// router.post('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect('/');
// });

// //Might not get to persisting user
// router.get('/me', (req, res) => {
//   res.json(req.user);
// });

const router = require('express').Router();
const User = require('../db/models/user');

module.exports = router;

const userNotFound = next => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

router.get('/me', async (req, res, next) => {
  if (!req.session.userId) {
    userNotFound(next);
  }
  res.json(req.user || {});
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
  console.log('do we hit this');
  req.session.destroy();
  req.logout();
  res.status(204).end();
});
