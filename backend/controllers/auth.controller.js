const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { success, fail } = require('../utils/responseHelper');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) return fail(res, 'Email already in use');
    const user = await User.create({ name, email, password, role });
    success(res, { token: generateToken(user._id), role: user.role, name: user.name }, 201);
  } catch (e) { fail(res, e.message, 500); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return fail(res, 'Invalid credentials', 401);
    success(res, { token: generateToken(user._id), role: user.role, name: user.name, id: user._id });
  } catch (e) { fail(res, e.message, 500); }
};

exports.getMe = async (req, res) => success(res, req.user);
