const User = require('./user');
const Transaction = require('./transaction');

// ASSOCIATIONS
User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
  User,
  Transaction,
};
