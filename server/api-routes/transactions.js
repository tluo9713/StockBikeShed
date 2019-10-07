const router = require('express').Router();
const { Transaction, User } = require('../db/models');
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

//Creating a new user route. Destructured because we don't want to take any additional input such as being given additional funds when they shouldn't.
//ADDTIONAL NOTES: DO NOT TAKE THEIR PURCHASE PRICE: make a api call to grab the price so they can't just give us a false purchase price and buy for lower than actual value.
//api key : YIEAB87E08BESE7W
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
  let topSecretApiKey = 'YIEAB87E08BESE7W';

  try {
    let stock = await axios.get(`${url}${ticker}&apikey=${topSecretApiKey}`);
    // console.log('start');
    // let test = await axios.get('/api/users');
    // console.log(test);
    if (stock['data']['Global Quote'] === undefined) {
      let err = new Error('Could not find Stock');
      throw err;
    }
    let purchasePrice = stock['data']['Global Quote']['05. price'] * 100;
    let userAccount = await User.findByPk(userId);
    const fundsAfterPurchase = userAccount.funds - purchasePrice;
    //check if there are enough funds else fail transaction
    if (fundsAfterPurchase < 0) {
      let err = new Error('Insufficient Funds');
      throw err;
    }
    // let returnData = await axios.put(`api/users/${userId}`, { purchasePrice });
    // console.log('returndata', returnData);
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
