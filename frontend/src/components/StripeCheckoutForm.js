import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import NotyfContext from './NotyfContext';

export const StripeCheckoutForm = ({ history }) => {
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
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
      notyf.error('Please login to continue');
    }
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(order._id));
    } else {
      console.log('Not paid yet');
    }
  });

  async function checkoutHandler() {
    console.log(order._id);
    const line_items = order.orderItems.map(item => {
      return {
        quantity: item.qty,
        price_data: {
          currency: 'aed',
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            description: item.name,
            // images: [item.image],
            images: []
          }
        }
      };
    });
    // const line_items = {
    //   quantity: order.orderItems.length,
    //   price_data: {
    //     currency: 'aed',
    //     unit_amount: order.totalPrice * 100,
    //     product_data: {
    //       name: 'Order Items',
    //       description: 'All cart items at discounted price',
    //       images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png']
    //     }
    //   }
    // };
    const customer_email = order.user.email;
    const orderId = order._id;
    const body = {
      line_items,
      customer_email,
      orderId
    };
    const staticData = {
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'aed',
            unit_amount: 2800,
            product_data: {
              name: 'Cumulus',
              description: 'Light as air. ',
              images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png']
            }
          }
        }
      ],
      customer_email: 'kartikeyarai7@gmail.com'
    };

    try {
      console.log(body);
      console.log(staticData);
      const { data } = await axios.post('/api/create-checkout-session', body);
      console.log(data);
      //   const bod = await data.json();
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
    // console.log(res);
  }

  return (
    <div className='text-center my-2'>
      <button onClick={checkoutHandler} className='btn btn-success btn-block'>
        Pay Now
      </button>
    </div>
  );
};

export default StripeCheckoutForm;
