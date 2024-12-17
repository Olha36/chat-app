const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (user) return res.status(400).json('User with the given email already exists..');
  if (!name || !email || !password) return res.status(400).json('All fields are required..');
  if (!validator.isEmail(email)) return res.status(400).json('Invalid email..');
  if (!validator.isStrongPassword(password)) return res.status(400).json('The password must be stronger..');
  
};

module.exports = { registerUser };
