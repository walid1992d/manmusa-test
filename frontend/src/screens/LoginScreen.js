import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const onGuestLoginHandler = () => {
    dispatch(login('guest@mail.com', 'guest'));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className='my-3'>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address / Number</Form.Label>
          <Form.Control type='string' placeholder='Enter email or number ' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <span className='p-2  '> New Customer? </span>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            {' '}
            <span className='text-light bg-success p-2 reg'>Register</span>
          </Link>
        </Col>
        <Col>
          <Link to={'/forgot-password'}>
            <span className='text-light bg-danger p-2  '>Forgot Password</span>{' '}
          </Link>
        </Col>
      </Row>
      <h2 className='my-3'>Or </h2>
      <Button onClick={onGuestLoginHandler}>Guest login</Button>
    </FormContainer>
  );
};

export default LoginScreen;
