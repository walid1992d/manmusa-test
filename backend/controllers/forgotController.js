import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const API_KEY = process.env.MAILER_KEY;
sgMail.setApiKey(API_KEY);

const getPassword = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  let user;
  user = await User.findOne({ email });
  if (user) {
    // res.json(user);
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user._id
    };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    const link = `http://localhost:3001/api/forgot-password/reset-password/${user._id}/${token}`;
    const message = {
      to: email,
      from: { name: 'Mansamusa', email: 'info@mansamusa.ae' },
      subject: 'Password Reset Link',
      text: `Hi ${name}, This is your one time password reset link ${link}. This will expire in 15 min`,
      html: `Hi ${name}, This is your one time password reset link. <br>${link}   <br> This will expire in 15 min`
    };
    console.log(link);
    try {
      await sgMail.send(message);
    } catch (error) {
      console.log(error);
    }
    res.json(link);
  } else {
    res.json('User does not exist');
  }
});
const newPassword = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const token = req.params.token;
  const user = await User.findById(id);
  if (user) {
    const secret = process.env.JWT_SECRET + user.password;
    try {
      const payload = jwt.verify(token, secret);
      res.render('reset-password', { email: user.email });
      //   res.json('Verified');
    } catch (error) {
      console.log(error);
    }
    // res.send(req.params);
  } else {
    res.send('User does not exist');
  }
});
const createNewPassword = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const token = req.params.token;
  const { password, passwordTwo } = req.body;
  const user = await User.findById(id);
  if (user) {
    const secret = process.env.JWT_SECRET + user.password;
    console.log(req.body);
    console.log(password);

    try {
      const payload = jwt.verify(token, secret);
      if (password === passwordTwo) {
        user.password = password;
      }
      await user.save();
      res.send('Password Changed. Please login with the new password');
    } catch (error) {
      console.log(error.message);
    }
    // res.send(req.params);
  } else {
    res.send('User does not exist');
  }
});

export { getPassword, newPassword, createNewPassword };
