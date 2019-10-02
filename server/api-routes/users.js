const router = require('express').Router();
const User = require('../db/models/user');

//We want to have routes to be able to grab user info. Such as when they sign in they should be able to see their funds and also edit their information.

//Grab all users, for testing purposes. If planning on keeping this, may need to have some authentication.
router.get('/', async (req, res, next) => {
  try {
    const allUser = await User.findAll();
    res.status(200).json(allUser);
  } catch (error) {
    next(error);
  }
});

//Grabs a user by their ID. will definitely need to have some security authentication.
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// router.get('/:id/orders', async (req, res, next) => {
//   const id = req.params.id

//   try {
//     let pendingOrder = await Order.findOne({
//       where: {userId: id, isFulfilled: 'pending'},
//       include: [{model: OrderDetail}]
//     })
//     if (pendingOrder === null) {
//       pendingOrder = Order.create({
//         merchantAmt: 0,
//         tax: 0.08875,
//         shippingAmt: 0,
//         totalAmt: 0,
//         isFulfilled: 'pending',
//         userId: id
//       })
//     }
//     res.status(200).json(pendingOrder)
//   } catch (error) {
//     next(error)
//   }
// })

//Creating a new user route. Destructured because we don't want to take any additional input such as being given additional funds when they shouldn't.
router.post('/', async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

//Will need to create route to edit info. maybe their email, names.
//Maybe a separate route for adding funds?

// router.put('/:id', async (req, res, next) => {
//   const {email, firstName, lastName, password} = req.body
//   const id = req.params.id

//   try {
//     let user = await User.update(
//       {email, firstName, lastName, password},
//       {returning: true, where: {id}}
//     )
//     res.json(user[1])
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:id/address', async (req, res, next) => {
//   const id = req.params.id
//   const {city, state, zipcode, address} = req.body
//   try {
//     const updatedAddress = await Address.update(
//       {city, state, zipcode, address, userId: id},
//       {returning: true, where: {userId: id}}
//     )
//     res.status(201).json(updatedAddress[1])
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router;
