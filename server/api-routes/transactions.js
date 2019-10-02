const router = require('express').Router();
const { User, Transaction } = require('../db/models');
const axios = require('axios');

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
//ADDTIONAL NOTES: DO NOT TAKE THEIR PURCHASE PRICE: make a api call to grab the price so they can't just give us a false purchase price and buy for lower than actual value.
//api key : YIEAB87E08BESE7W
//keep this a secret!
router.post('/', async (req, res, next) => {
  const { ticker, shares, userId } = req.body;
  //WARNING destructuring for user ID but in the future will need to do several things:
  //check if there are enough funds else fail transaction
  //grab user id from the request
  const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
  let topSecretApiKey = 'YIEAB87E08BESE7W';

  let stock = await axios.get(`${url}${ticker}&apikey=${topSecretApiKey}`);
  let purchasePrice = stock['data']['Global Quote']['05. price'] * 100;
  try {
    const newTransaction = await Transaction.create({
      ticker,
      shares,
      purchasePrice,
      userId,
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
