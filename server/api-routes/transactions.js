const router = require('express').Router();
// const Transaction = require('../db/models/transaction');
const { User, Transaction } = require('../db/models');

//We want to have routes to be able to grab user info. Such as when they sign in they should be able to see their funds and also edit their information.

//Grab all tranactions, for testing purposes. If planning on keeping this, may need to have some authentication.
router.get('/', async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll();
    res.status(200).json(allTransactions);
  } catch (error) {
    next(error);
  }
});

//Grabs a user by their ID. will definitely need to have some security authentication.
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const userTransactions = await Transaction.findAll({
      where: { userId: id },
    });
    res.status(200).json(userTransactions);
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
  const { ticker, shares, purchasePrice, userId } = req.body;
  //WARNING destructuring for user ID but in the future will need to do several things:
  //check if there are enough funds else fail transaction
  //grab user id from the request

  console.log('this is user id', typeof userId);
  try {
    // console.log(await Users.findByPk(userId));
    const newTransaction = await Transaction.create({
      ticker,
      shares,
      purchasePrice,
      userId: 1,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
});

//Can't edit transactions buddy!

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
