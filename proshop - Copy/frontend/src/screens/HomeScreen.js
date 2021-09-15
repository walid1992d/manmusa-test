import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    console.log(userInfo);
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

      {!keyword ? (
        <>
          <Row className='my-4'>
            <Col sm={12} md={6} lg={4} xl={4}>
              <Card className='c1  '>
                <h3 className='text-light'>Fashion</h3>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={4}>
              <Card className='c2'>
                <h3 className='text-light'>Home Art</h3>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <Card className='c3'>
                <h3 className='text-light'>Beauty</h3>
              </Card>
            </Col>
          </Row>
          <h2 className='mt-5 mb-3'>Top Rated Products</h2>

          <ProductCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <section>
        <h2 className='mt-5 mb-3'>Latest Products</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map(product => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </>
        )}
      </section>
    </>
  );
};

export default HomeScreen;
