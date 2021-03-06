const router = require('express').Router();
const { Transaction, User } = require('../db/models');
const axios = require('axios');

//We want to have routes to be able to grab user info. Such as when they sign in they should be able to see their funds and also edit their information.

//Grab all tranactions, for testing purposes. If planning on keeping this, may need to have some authentication.
// router.get('/', async (req, res, next) => {
//   try {
//     const allTransactions = await Transaction.findAll();
//     res.status(200).json(allTransactions);
//   } catch (error) {
//     next(error);
//   }
// });

//Grabs a user by their ID. will definitely need to have some security authentication.
router.get('/:id', async (req, res, next) => {
  console.log('routes', req.session.userId);
  const id = req.params.id;
  if (req.session.userId == id) {
    try {
      const userTransactions = await Transaction.findAll({
        where: { userId: id },
      });
      res.status(200).json(userTransactions);
    } catch (error) {
      next(error);
    }
  } else {
    let err = new Error('You do not have access to this information');
    next(err);
  }
});

//Creating a new user route. Destructured because we don't want to take any additional input such as being given additional funds when they shouldn't.
//ADDTIONAL NOTES: DO NOT TAKE THEIR PURCHASE PRICE: make a api call to grab the price so they can't just give us a false purchase price and buy for lower than actual value.
//keep this a secret!
router.post('/', async (req, res, next) => {
  //Grab the userId from the req.session. This is to prevent other users from
  //making requests and purchasing stocks without owner knowledge
  let { userId } = req.session;
  //Ticker and shares will be sent from the user side.
  let { ticker, shares } = req.body;

  //If by some reason ticker isn't to upper case yet, make it uppercase. This
  //will make consolidating same stocks easier.
  ticker = ticker.toUpperCase();
  const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
  let topSecretApiKey = 'U38PY6XXA3QP0MSD';
  try {
    if (shares % 1 != 0) {
      let error = new Error(`You can only purchase whole number quantities`);
      error.status = 404;
      throw error;
    }
    let stock = await axios.get(`${url}${ticker}&apikey=${topSecretApiKey}`);
    if (stock['data']['Global Quote'] === undefined) {
      let err = new Error('Could not find Stock');
      err.status = 404;
      throw err;
    }
    //We want to make sure stock price is an integer or else we will fail
    //sequelize validations
    const purchasePrice = parseInt(
      stock['data']['Global Quote']['05. price'] * 100000
    );
    const totalCost = shares * purchasePrice;
    let userAccount = await User.findByPk(userId);

    const fundsAfterPurchase = userAccount.funds - totalCost;
    //check if there are enough funds else fail transaction
    if (fundsAfterPurchase < 0) {
      let err = new Error('Insufficient Funds');
      err.status = 404;
      throw err;
    }
    const newTransaction = await Transaction.create({
      ticker,
      shares,
      purchasePrice,
      userId,
    });
    await User.update({ funds: fundsAfterPurchase }, { where: { id: userId } });
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
