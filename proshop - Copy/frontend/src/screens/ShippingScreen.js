import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import Message from '../components/Message';
import { saveShippingAddress } from '../actions/cartActions';
import NotyfContext from '../components/NotyfContext';

let guestName, guestEmail, guestNumber;

export const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const notyf = useContext(NotyfContext);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const submitHandler = e => {
    e.preventDefault();

    if (number.length !== 10 && userInfo._id === '613891b3cb025667fc50de38') {
      notyf.error('Please enter 10 digit number');
    } else {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));

      history.push('/payment');
      guestName = name;
      guestEmail = email;
      guestNumber = number;
      localStorage.setItem('guestEmail', email);
      localStorage.setItem('guestNumber', number);
      localStorage.setItem('guestName', name);
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        {userInfo.email === 'guest@mail.com' && (
          <>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter name' value={name} required onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter Email' value={email} required onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='number'>
              <Form.Label>Number</Form.Label>
              <Form.Control type='text' placeholder='Enter Number' value={number} required onChange={e => setNumber(e.target.value)}></Form.Control>
            </Form.Group>
          </>
        )}

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter address' value={address} required onChange={e => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' placeholder='Enter country' value={country} required onChange={e => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter city' value={city} required onChange={e => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={e => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <span>
          <Link className='btn btn-primary m-3' to='/cart'>
            Go Back
          </Link>
          <Button type='submit' variant='primary' className='m-3'>
            Continue
          </Button>
        </span>
      </Form>
      <Message variant='success'>Postal Code for regions within UAE is 00000</Message>
    </FormContainer>
  );
};

export { guestEmail, guestName, guestNumber };
