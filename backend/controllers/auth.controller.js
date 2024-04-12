import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { name, username, email, password, agreedToTerms } = req.body;

  try {
    if (!name || !username || !email || !password || username === '' || email === '' || password === '' || !agreedToTerms) {
      return next(errorHandler(400, 'All fields are required and you must agree to the terms.'));
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(errorHandler(400, 'Username or email already exists.'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    // Note: agreedToTerms Validate at user Schema already
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      agreedToTerms
    });

    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password || email === '' || password === '') {
      return next(errorHandler(400, 'All fields are required'));
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

