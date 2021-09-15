import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import NotyfContext from './NotyfContext';

export const CheckoutForm = ({ orderId }) => {
  const dispatch = useDispatch();
  const notyf = useContext(NotyfContext);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const amountToPay = order.totalPrice * 100;
  console.log(amountToPay);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else {
      console.log('Not paid yet');
    }
  }, [dispatch, successPay, order]);

  const handleSubmit = async event => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      console.log('Stripe 23 | token generated!', paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post('/api/stripe/charge', {
          amount: Math.round(amountToPay),
          id: id,
          email: userInfo.email
        });
        console.log('Stripe 35 | data', response.data.success);
        if (response.data.success) {
          console.log('CheckoutForm.js 25 | payment successful!');
          dispatch(payOrder(orderId, response.data));
          notyf.success('Payment Successful! Order placed');

          // localStorage.removeItem('cartItems');
          // localStorage.removeItem('shippingAddress');
          // localStorage.removeItem('paymentMethod');
        }
      } catch (error) {
        console.log('CheckoutForm.js 28 | ', error);
      }
      //send token to backend here
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }} className='text-center'>
      <CardElement />
      <button className='btn btn-success my-4'>Pay Now</button>
    </form>
  );
};
