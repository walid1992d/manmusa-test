import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Stripe from 'stripe';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import forgotRoutes from './routes/forgotRoutes.js';
import sgMail from '@sendgrid/mail';

dotenv.config();

connectDB();

const app = express();

const API_KEY = process.env.MAILER_KEY;
sgMail.setApiKey(API_KEY);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const __dirname = path.resolve();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://checkout.stripe.com']
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/backend/views'));

const stripe = new Stripe(process.env.SECRET_KEY);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/forgot-password', forgotRoutes);
// app.use('/api/create-checkout-session', checkoutRoutes);

app.post('/api/stripe/charge', async (req, res) => {
  console.log('stripe-routes.js 9 | route reached', req.body);
  let { amount, id, email } = req.body;
  console.log('stripe-routes.js 10 | amount and id', amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'AED',
      description: 'Mansamusa Payment',
      payment_method: id,
      receipt_email: email,
      confirm: true
    });
    console.log('stripe-routes.js 19 | payment', payment);
    res.json({
      message: 'Payment Successful',
      success: true
    });
  } catch (error) {
    console.log('stripe-routes.js 17 | error', error);
    res.json({
      message: 'Payment Failed',
      success: false
    });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const YOUR_DOMAIN = 'http://localhost:3001';
    const { line_items, customer_email, orderId } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      customer_email: customer_email,
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success?id=${orderId}`,
      cancel_url: `${YOUR_DOMAIN}/cancel?id=${orderId}`
    });
    // res.redirect(303, session.url);
    res.json({ url: session.url });
    console.log(session.url);
    // res.send('Session created');
  } catch (error) {
    console.log(error);
  }
});

app.get('/success', async (req, res) => {
  const id = req.query.id;
  // res.send('Payment Successful');
  // res.redirect(303,'/')
  res.redirect(`http://localhost:3000/order/${id}/success0004db1a7c5980fdf51157ade1df43c1`);
});

app.get('/cancel', async (req, res) => {
  const id = req.query.id;
  res.redirect(`http://localhost:3000/order/${id}/failed`);
});

app.post('/api/mail/register', async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  const message = {
    to: email,
    from: { name: 'Mansamusa', email: 'care@mansamusa.ae' },
    subject: 'Welcome to Mansamusa',
    text: `Hi ${name}, Welcome to Mansamusa. Your account has been successfully registered with us!`,
    html: `<img src='${process.env.IMAGE_ENCODED}'>  <p>Hi ${name}, <br>  Welcome to Mansamusa. Your account has been successfully registered with us! </p> <br> <p>Happy Shopping!</p>  <br> <p>Mansamusa Care Team</p>`
  };
  try {
    await sgMail.send(message);
    res.status(200).json('Message sent');
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/mail/order', async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  const message = {
    to: email,
    from: { name: 'Mansamusa', email: 'care@mansamusa.ae' },
    subject: 'New Order',
    text: `Hi ${name}, You have a new order. Please check the admin panel`,
    html: `<h3>Hi ${name}, You have a new order. Please check the admin panel</h3>`
  };
  try {
    await sgMail.send(message);
    res.status(200).json('Message sent');
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/mail/payment/card', async (req, res) => {
  const { name, email, totalPrice, orderId } = req.body;
  const message = {
    to: email,
    from: { name: 'Mansamusa', email: 'care@mansamusa.ae' },
    subject: 'Thank you for your order',
    text: `Hi ${name}, We have received your order!.Your payment for ${totalPrice} was successful.`,
    html: `<h4>Hi ${name}, We have received your order! Your payment for ${totalPrice} was successful. Order ID is ${orderId}</h4>`
  };
  try {
    await sgMail.send(message);

    res.status(200).json('Message sent');
  } catch (error) {
    console.log(error);
  }
});
app.post('/api/mail/payment/cash', async (req, res) => {
  const { name, email, totalPrice, orderId } = req.body;
  const message = {
    to: email,
    from: { name: 'Mansamusa', email: 'care@mansamusa.ae' },
    subject: 'Thank you for your order',
    text: `Hi ${name}, We have received your order!Your payment for ${totalPrice} is due on delivery. Your Order Id is ${orderId}`,
    html: `Hi ${name}, We have received your order!Your payment for ${totalPrice} is due on delivery. Your Order Id is ${orderId} `
  };
  try {
    await sgMail.send(message);
    res.status(200).json('Message sent');
  } catch (error) {
    console.log(error);
  }
});
app.post('/api/mail/delivery', async (req, res) => {
  const { name, email } = req.body;
  const message = {
    to: email,
    from: { name: 'Mansamusa', email: 'care@mansamusa.ae' },
    subject: 'Order Delivered',
    text: `Hi ${name}, Your order was successfully delivered. Thank you for shopping with Mansamusa`,
    html: `Hi ${name}, Your order was successfully delivered. Thank you for shopping with Mansamusa`
  };

  try {
    await sgMail.send(message);
    res.status(200).json('Message sent');
  } catch (error) {
    console.log(error);
  }
});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} is listening at port ${PORT}`);
});
