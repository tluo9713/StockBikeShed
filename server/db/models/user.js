const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');
//Creating User Model. User model has email, first name,last name, password and funds.
//User needs to have email, first name, last name, password.
//For security, the password has been salted. None of these required values are optional so they'll have a validate not empty set to be true.
//The default value of funds should be $5000.
const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  //We are using sequelize integer because if we use float, there would be problems adding certain numbers together. Namely 0.1+0.2 !== 0.3. We can just use integers and divde by 100 to capture the value in cents.
  funds: {
    type: Sequelize.INTEGER,
    defaultValue: 500000000,
    validate: { min: 0 },
  },
});

module.exports = User;

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('sha1')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

const encryptpw = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(encryptpw);
User.beforeUpdate(encryptpw);
