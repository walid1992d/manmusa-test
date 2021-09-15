import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='text-center'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div' className='text-center'>
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
        {product.discount !== 0 ? (
          <Card.Body>
            <Card.Text as='h6' className='text-center'>
              <s>AED {product.price}</s>
            </Card.Text>

            <Card.Text as='h5' className='text-center text-danger'>
              {' '}
              AED {product.discountedPrice}
            </Card.Text>
            <Card.Text as='div' className='text-light text-center bg-danger'>
              {product.discount}% Off
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Text as='h5' className='' className='text-center'>
            AED {product.price}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
