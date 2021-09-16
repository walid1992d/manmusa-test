import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white' }}>
      <Container>
        <Row className='pb-5'>
          <Col className='text-left ' sm={6} md={6} lg={4} xl={3}>
            <h6 className='text-light'>Top Categories</h6>
            <ul style={{ listStyle: 'none', marginTop: '2em' }}>
              <li className='my-3'>
                <Link className='text-light my-3' to='/'>
                  Fashion
                </Link>
              </li>
              <li className='my-3'>
                <Link className='text-light my-3' to='/'>
                  Home N Art
                </Link>
              </li>
              <li className='my-3'>
                <Link className='text-light my-3' to='/'>
                  Beauty
                </Link>
              </li>
            </ul>
          </Col>

          <Col className='text-left ' sm={6} md={6} lg={4} xl={3}>
            <h6 className='text-light'>Customer Care</h6>

            <ul style={{ listStyle: 'none', marginTop: '2em' }}>
              <li className='my-3 '>
                <a href='mailto:care@mansamusa.ae' className='text-light'>
                  Contact Us
                </a>
              </li>

              <li className='my-3'>
                <Link className='text-light my-3' to='/faq'>
                  FAQ
                </Link>
              </li>
            </ul>
          </Col>
          <Col className='text-left ' sm={6} md={6} lg={4} xl={3}>
            <h6 className='text-light'>Shipping & Return</h6>
            <ul style={{ listStyle: 'none', marginTop: '2em' }}>
              <li className='my-3'>
                <Link className='text-light my-3' to='/sinfo'>
                  Shipping & Delivery
                </Link>
              </li>
              <li className='my-3'>
                <Link className='text-light my-3' to='/return'>
                  Online Returns
                </Link>
              </li>
            </ul>
          </Col>
          <Col className='text-left ' sm={6} md={6} lg={4} xl={3}>
            <h6 className='text-light'>About Us</h6>
            <ul style={{ listStyle: 'none', marginTop: '2em' }}>
              <li className='my-3'>
                <Link className='text-light my-3' to='/about'>
                  About Us
                </Link>
              </li>
              <li className='my-3'>
                <a href='https://www.facebook.com/MansaMusa.ae' className='text-light mx-2'>
                  <i className='fab fa-facebook'></i>
                </a>
                <a href='https://www.instagram.com/mansamusa.ae/' className='text-light'>
                  <i className='fab fa-instagram'></i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>&copy; 2021 Copyright </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
