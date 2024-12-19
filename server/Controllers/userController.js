const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: '3d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json('User with the given email already exists..');
    if (!name || !email || !password) return res.status(400).json('All fields are required..');
    if (!validator.isEmail(email)) return res.status(400).json('Invalid email..');
    if (!validator.isStrongPassword(password)) return res.status(400).json('The password must be stronger..');

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10); //random string that prevents to decode the password
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ _id: user, name, email, token });
  } catch (error) {
    console.log('Error is:', error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser };
