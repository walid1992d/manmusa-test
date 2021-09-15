import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';

import FormContainer from '../components/FormContainer';
import NotyfContext from '../components/NotyfContext';

const ForgotPasswordScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let link, res;
  const notyf = useContext(NotyfContext);

  const [message, setMessage] = useState(null);

  async function sendMail(name, email) {
    const { data } = await axios.post(`/api/forgot-password`, { name, email });
    return data;
  }

  const redirect = location.search ? location.search.split('=')[1] : '/';

  async function submitHandler(e) {
    e.preventDefault();
    console.log(name, email);
    link = await sendMail(name, email);
    console.log(link);

    if (link !== 'User does not exist') {
      console.log('Verified');
      notyf.success('Reset Password Link Sent');
    } else {
      notyf.error('User does not exist');
    }
  }

  return (
    <FormContainer>
      <h1>Reset Password</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Reset
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            {' '}
            <span className='bg-success p-2 text-light'>Login</span>{' '}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
