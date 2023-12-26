const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const { HttpError, controlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const userIsAlready = await User.findOne({ email });
  if (userIsAlready) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  console.log(passwordCompare);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = User.findById(_id);
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const current = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  logout: controlWrapper(logout),
  current: controlWrapper(current),
};
