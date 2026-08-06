import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// POST /api/auth/signin — verify credentials and return a JWT.
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Same message for missing user and wrong password so we don't
    // reveal which emails exist.
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};
