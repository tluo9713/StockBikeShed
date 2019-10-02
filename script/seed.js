/* eslint-disable max-statements */
/* eslint-disable no-unused-vars */
'use strict';

const db = require('../server/db');
const { User, Transaction } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // USERS
  const jason = await User.create({
    email: 'jason@email.com',
    password: '1234567890',
    firstName: 'Jason',
    lastName: 'Cho',
  });

  const sri = await User.create({
    email: 'sri@email.com',
    password: '0123456789',
    firstName: 'Sri',
    lastName: 'Velagapudi',
  });

  const thomas = await User.create({
    email: 'thomas@email.com',
    password: 'hunter2345',
    firstName: 'Thomas',
    lastName: 'Luo',
  });

  const ruslan = await User.create({
    email: 'ruslan@email.com',
    password: '0123456789',
    firstName: 'Ruslan',
    lastName: 'Zyabbarov',
  });

  const hari = await User.create({
    email: 'hari@email.com',
    password: '0123456789',
    firstName: 'Hari',
    lastName: 'Doshi',
  });

  const alex = await User.create({
    email: 'alex@email.com',
    password: '0123456789',
    firstName: 'Alex',
    lastName: 'Mok',
  });

  const terence = await User.create({
    email: 'terence@email.com',
    password: '0123456789',
    firstName: 'Terence',
    lastName: 'Helsel',
  });

  const daniel = await User.create({
    email: 'daniel@email.com',
    password: '0123456789',
    firstName: 'Daniel',
    lastName: 'Wasserman',
  });

  //TRANSACTIONS
  const AppleStock = await Transaction.create({
    ticker: 'AAPL',
    shares: 100,
    purchasePrice: 1000,
    userId: thomas.id,
  });

  const GoogleStock = await Transaction.create({
    ticker: 'Goog',
    shares: 10,
    purchasePrice: 400,
    userId: jason.id,
  });

  const FSAStock = await Transaction.create({
    ticker: 'FSA',
    shares: 123,
    purchasePrice: 1,
    userId: terence.id,
  });

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
