import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-light'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row style={{ backgroundColor: 'rgb(243, 201, 102)' }}>
              <Col md={12} lg={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col className='flex' md={0} lg={6}>
                <Carousel.Caption className='carousel-caption align-items-center cap '>
                  <h2 className='my-5'>{product.name}</h2>
                  <h5>
                    <em>
                      {product.reviews[0].comment} - {product.reviews[0].name}{' '}
                    </em>
                  </h5>
                </Carousel.Caption>
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
