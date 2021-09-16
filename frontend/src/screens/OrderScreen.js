import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import StripeContainer from '../components/StripeContainer';
import CheckoutContainer from '../components/CheckoutContainer';
import NotyfContext from '../components/NotyfContext';
import { updateUserProfile } from '../actions/userActions';
import { getOrderDetails, deliverOrder, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import { guestEmail, guestName } from './ShippingScreen';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const notyf = useContext(NotyfContext);

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);

  const userDetails = useSelector(state => state.userDetails);
  const { loadingUser, errorUser, user } = userDetails;

  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  let deliveryStarted = false;
  let preOrderCreated = false;
  let orderCreated = false;
  let merchantInfo, merchant, pre, ord;
  let countPay = 0;

  async function sendMail({ name, email, totalPrice, orderId }) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post(`/api/mail/payment/card`, { name, email, totalPrice, orderId }, config);
  }

  async function sendMailTwo({ name, email, totalPrice, orderId }) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post(`/api/mail/payment/cash`, { name, email, totalPrice, orderId }, config);
  }
  async function sendMailDel({ name, email }) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const { data } = await axios.post(`/api/mail/delivery`, { name, email }, config);
      notyf.success('Mail sent');
    } catch (error) {
      notyf.error(error);
    }
  }

  async function startDelivery() {
    try {
      const { data } = await axios.get('/api/delivery');
      console.log(data);
      deliveryStarted = true;
      notyf.success('Connected To Delivery API');

      return data;
    } catch (error) {
      console.log(error);
      notyf.error('Error');
    }
  }

  async function createDeliveryPre() {
    try {
      const PickupLocationId = merchant.id;
      const CompanyOrderTrackId = orderId;
      const OrderMidBoxQuantity = 1;
      const CustomerName = userInfo.name;
      const CustomerPhone = userInfo.number; // function
      const CustomerEmail = userInfo.email;
      const CustomerAddress = order.shippingAddress.address;
      const CustomerLatitude = 25.197197;
      const CustomerLongitude = 55.2743764;
      const IsCashPayment = order.paymentMethod === 'Cash' ? true : false;
      const IsCardPayment = order.paymentMethod !== 'Cash' ? true : false;
      const PaymentAmount = order.totalPrice;
      const CustomerAddressTypeId = 1; //  function
      const CustomerAddressNote = 'NA'; //  function
      const Area = order.shippingAddress.address;
      const Building = 'NA'; //  function
      const Floor = 'NA'; //  function
      const Unit = 'NA'; //  function
      const TemperatureTypeId = 0;

      const { data } = await axios.post('/api/delivery/preorder', { PickupLocationId, CompanyOrderTrackId, OrderMidBoxQuantity, CustomerName, CustomerPhone, CustomerEmail, CustomerAddress, CustomerLatitude, CustomerLongitude, IsCashPayment, IsCardPayment, PaymentAmount, CustomerAddressTypeId, CustomerAddressNote, Area, Building, Floor, Unit, TemperatureTypeId });
      preOrderCreated = true;
      notyf.success('Generated Delivery PreOrder');
      return data;
    } catch (error) {
      console.log(error);
      notyf.error('Error');
    }
  }
  async function createDelivery() {
    try {
      const preOrderId = pre.preOrderId;
      const deliveryServiceTypeId = pre.onDemand.deliveryServiceId; //  support for timeslot
      // const timeSlot = {
      //   startTime: 1630926000000,
      //   endTime: 1630933200000
      // };

      // const { data } = await axios.post('/api/delivery/order', { preOrderId, deliveryServiceTypeId, timeSlot });
      const { data } = await axios.post('/api/delivery/order', { preOrderId, deliveryServiceTypeId });
      orderCreated = true;
      notyf.success('Delivery Order Generated');
      return data;
    } catch (error) {
      console.log(error);
      notyf.error('Error');
    }
  }

  async function createRequest() {
    const line_items = order.orderItems.map(item => {
      return {
        quantity: item.qty,
        price_data: {
          currency: 'aed',
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            description: item.name,
            images: [item.image]
          }
        }
      };
    });
    const email = order.user.email;
    try {
      const { data } = await axios.post('/api/create-checkout-session', { line_items, email });
      console.log(data);
      return data;
    } catch (error) {
      console.log('Error');
    }
  }

  async function startDeliveryHandler() {
    merchantInfo = await startDelivery();
    merchant = merchantInfo.locations[0];
    console.log(merchant);
  }

  async function preorderDeliveryHandler() {
    if (deliveryStarted) {
      pre = await createDeliveryPre();
      console.log('Preorder generated');
      console.log(pre);
    } else {
      notyf.error('Please start delivery first');
      console.log('Please start delivery first');
    }
  }

  async function orderDeliveryHandler() {
    if (preOrderCreated) {
      ord = await createDelivery();
      console.log('Order generated');
      console.log(ord);
    } else {
      console.log('Please create pre order first');
      notyf.error('Please create pre order first');
    }
  }

  async function createSessionHandler() {
    const res = await createRequest();
  }

  async function checkoutHandler() {
    const line_items = order.orderItems.map(item => {
      return {
        quantity: item.qty,
        price_data: {
          currency: 'aed',
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            description: item.name,
            images: [item.image]
          }
        }
      };
    });
    const email = order.user.email;
    try {
      const data = await axios.post('/api/create-checkout-session', { line_items, email });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const clickHandler = () => {
    const prop = {
      name: userInfo.name,
      email: userInfo.email,
      totalPrice: order.totalPrice,
      orderId: order._id
    };
    sendMail(prop);

    dispatch(updateUserProfile({ id: user._id, name: 'Guest user', email: 'guest@gmail.com', password: 'guest', number: '0123456789', address: 'Guest Address Here' }));
  };

  const clickHandlerTwo = () => {
    const mailId = order.user._id === '613891b3cb025667fc50de38' ? guestEmail : userInfo.name;
    const mailName = order.user._id === '613891b3cb025667fc50de38' ? guestName : userInfo.email;
    const prop = {
      name: mailName,
      email: mailId,
      totalPrice: order.totalPrice,
      orderId: order._id
    };
    sendMailTwo(prop);
  };

  const deliverMailHandler = () => {
    const mailId = order.user._id === '613891b3cb025667fc50de38' ? guestEmail : order.user.name;
    const mailName = order.user._id === '613891b3cb025667fc50de38' ? guestName : order.user.email;
    const prop = {
      name: mailName,
      email: mailId
    };
    sendMailDel(prop);
  };

  if (!loading) {
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    if (order) {
      order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => (item.discount ? acc + item.qty * item.discountedPrice : acc + item.price * item.qty), 0));
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
      notyf.error('Please login to continue');
    }
    console.log(window.location.pathname);
    if (!order || successDeliver || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
    if (window.location.pathname.includes('failed')) {
      notyf.error('Payment failed');
    }
    if (window.location.pathname.includes('success0004db1a7c5980fdf51157ade1df43c1') && countPay === 0) {
      const paymentResult = {
        id: orderId,
        status: '',
        update_time: '',
        email_address: ''
      };
      dispatch(payOrder(orderId, paymentResult));

      countPay++;
    }
  }, [dispatch, order, successDeliver, orderId]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1 className='my-4 ord'>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Information </h2>
              <p>
                <strong> Customer Name: </strong> {order.user._id === '613891b3cb025667fc50de38' ? localStorage.getItem('guestName') : order.user.name}
              </p>
              <p>
                <strong>Email: </strong> <a href={`mailto:${order.user._id === '613891b3cb025667fc50de38' ? localStorage.getItem('guestEmail') : order.user.email}`}>{order.user._id === '613891b3cb025667fc50de38' ? localStorage.getItem('guestEmail') : order.user.email}</a>
              </p>

              <p>
                <strong>Number: </strong> {order.user._id === '613891b3cb025667fc50de38' ? localStorage.getItem('guestNumber') : userInfo.number}
              </p>

              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              {' '}
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {order.paymentMethod}
              {order.paymentMethod === 'Cash' ? (
                <Message variant='warning'>To be paid on delivery</Message>
              ) : order.isPaid ? (
                <Message variant='success'>
                  {/* {(order.paidAt = order.paidAt.toString())} */}
                  Paid on {order.paidAt.slice(0, 10)} at {order.paidAt.slice(11, 16)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x AED{item.discount ? item.discountedPrice : item.price} = AED{item.discount ? item.qty * item.discountedPrice : item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <Link className='btn btn-primary m-3' to='/'>
                Home
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Amount</Col>
                  <Col>AED{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>AED{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>VAT</Col>
                  <Col>AED{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>AED{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {!order.isPaid && order.paymentMethod === 'Stripe' ? (
                  <>
                    <CheckoutContainer />

                    <ListGroup>
                      <Message variant='success'>Zipcode (Zip) for regions within UAE is 00000. Pay with Card Below </Message>
                    </ListGroup>
                  </>
                ) : (
                  <p>Confirmed</p>
                )}
              </ListGroup.Item>

              {loadingDeliver && <Loader />}

              {!userInfo.isAdmin && order.isPaid && order.paymentMethod === 'Stripe' && <Button onClick={clickHandler}>Mail Transaction Receipt</Button>}
              {!userInfo.isAdmin && order.paymentMethod === 'Cash' && <Button onClick={clickHandlerTwo}>Mail Order Details</Button>}

              {userInfo && userInfo.isAdmin && (order.isPaid || order.paymentMethod === 'Cash') && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
              {userInfo && userInfo.isAdmin && (order.isPaid || order.paymentMethod === 'Cash') && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverMailHandler}>
                    Mail Delivery Confirmation
                  </Button>
                </ListGroup.Item>
              )}

              {userInfo && userInfo.isAdmin && (order.isPaid || order.paymentMethod === 'Cash') && (
                <Button type='button' className='btn btn-block' onClick={startDeliveryHandler}>
                  Start Delivery
                </Button>
              )}
              {userInfo && userInfo.isAdmin && (
                <Button type='button' className='btn btn-block' onClick={preorderDeliveryHandler}>
                  Create Delivery Preorder
                </Button>
              )}
              {userInfo && userInfo.isAdmin && (
                <Button type='button' className='btn btn-block' onClick={orderDeliveryHandler}>
                  Create Delivery Order
                </Button>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* {!order.isPaid && order.paymentMethod === 'Stripe' && (
        <Row>
          <Col>
            <h3>Card Payment </h3>
          </Col>
          <Col>
            <StripeContainer orderId={match.params.id} />
          </Col>
        </Row>
      )} */}
      {/* <Row>
        <Col>
          <CheckoutContainer />
        </Col>
      </Row> */}
    </>
  );
};

export default OrderScreen;
