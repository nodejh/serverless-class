const db = require('db').connect();
const mailer = require('mailer');
const Users = require('./src/users');

let users = new Users(db, mailer);

module.exports.saveUser = (event, context, callback) => {
  users.save(event.email, callback);
};