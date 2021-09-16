import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [comment, setComment] = useState('');

  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  let aC = [];
  product.reviews.forEach(element => {
    aC.push(element.comment);
  });
  console.log(aC);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        if (product.reviews[0]) {
          setName(product.name);
          setPrice(product.price);
          setDiscountedPrice(product.discountedPrice);
          setDiscount(product.discount);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
          setComment(product.reviews[0].comment);
          setComments(product.reviews);
        } else {
          setName(product.name);
          setPrice(product.price);
          setDiscountedPrice(product.discountedPrice);
          setDiscount(product.discount);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
          setComments(product.reviews);
        }
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      product.reviews[0]
        ? updateProduct({
            _id: productId,
            name,
            price,
            discountedPrice,
            discount,
            image,
            brand,
            category,
            description,
            comment,
            comments,
            countInStock
          })
        : updateProduct({
            _id: productId,
            name,
            price,
            discountedPrice,
            discount,
            image,
            brand,
            category,
            description,
            comments,
            countInStock
          })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter price' value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='discount'>
              <Form.Label>Discount </Form.Label>
              <Form.Control type='number' placeholder='Enter Discount' value={discount} onChange={e => setDiscount(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='discountedPrice'>
              <Form.Label> Discounted Price ({price * (1 - discount / 100)}) </Form.Label>
              <Form.Control type='number' placeholder='Enter discounted price' value={discountedPrice} onChange={e => setDiscountedPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='text' placeholder='Enter image url' value={image} onChange={e => setImage(e.target.value)}></Form.Control>
              <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={e => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={e => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control type='text' placeholder='Enter category' value={category} onChange={e => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' placeholder='Enter description' value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            {product.reviews[0] && (
              <>
                <h4>Edit reviews</h4>
                <Form.Group controlId='comment'>
                  <Form.Label>Review Comments</Form.Label>
                  <Form.Control type='text' placeholder='Enter Review Comment' value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                </Form.Group>
              </>
            )}
            {/* { product.reviews.length > 1 && 
            <Form.Group controlId='commentTwo'>
              <Form.Label>Review Comments</Form.Label>
              <Form.Control type='text' placeholder='Enter Review Comment' value={commentTwo} onChange={e => setCommentTwo(e.target.value)}></Form.Control>
            </Form.Group>
            }
            { product.reviews.length > 2 && 
            <Form.Group controlId='comment'>
              <Form.Label>Review Comments</Form.Label>
              <Form.Control type='text' placeholder='Enter Review Comment' value={commentThree} onChange={e => setCommentThree(e.target.value)}></Form.Control>
            </Form.Group>
            } */}

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      {/* <div className='text-center my-4 bg-light mx-auto w-50'>
        <h5>All Comments</h5>
        {aC.map(item => (
          <h6>{item}</h6>
        ))}
      </div> */}
    </>
  );
};

export default ProductEditScreen;
