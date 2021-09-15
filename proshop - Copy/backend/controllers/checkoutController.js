import asyncHandler from 'express-async-handler';
import axios from 'axios';
import { stripeAPI } from '../stripeconfig.js';

const getData = asyncHandler(async (req, res) => {
  const { line_items, customer_email } = req.body;
  // const domainUrl = 'localhost:3000/checkout';

  if (!line_items || !customer_email) {
    res.json('Missing params');
  }
  let session;
  console.log(line_items, customer_email);

  try {
    const session = await stripeAPI.checkout.sessions.create({
      line_items: line_items,
      customer_email: customer_email,
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:3001/order/6134eb68cc73d3f8e89fb72c/success',
      cancel_url: 'http://localhost:3001/order/6134eb68cc73d3f8e89fb72c/canceled'
    });
    res.redirect(303, session.url);
    // res.status(200).json('Session created');
  } catch (error) {
    console.log(error);
    res.send('Encountered Error');
  }
});

const createSession = asyncHandler(async (req, res) => {
  const { line_items, customer_email } = req.body;
  const domainUrl = `localhost:3001/checkout`;
  if (!line_items || !customer_email) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  let session;
  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email,
      success_url: `${domainUrl}/success`,
      cancel_url: `${domainUrl}/cancel`,
      shipping_address_collection: { allowed_countries: ['AE'] } // Change when expanding
    });
    // res.status(200).json({ sessionId: session.id });
    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

export { createSession, getData };
