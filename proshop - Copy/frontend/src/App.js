import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'notyf/notyf.min.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import About from './components/About';
import Faq from './components/Faq';
import Shipping from './components/Shipping';
import Return from './components/Return';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import WishlistScreen from './screens/WishlistScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OrderListScreen from './screens/OrderListScreen';
// import CheckoutContainer from './components/CheckoutContainer';

const App = () => {
  const ftb = require('./banners/footer-bg.png');
  return (
    <Router>
      <Header />
      <main className='py-3  '>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          {/* <Route path='/p2' component={CheckoutContainer} /> */}
          {/* <Route path='/checkout/success' component={SuccessScreen} />
          <Route path='/checkout/canceled' component={CancelScreen} /> */}

          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/forgot-password' component={ForgotPasswordScreen} exact />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/about' component={About} exact />
          <Route path='/faq' component={Faq} exact />
          <Route path='/sinfo' component={Shipping} exact />
          <Route path='/return' component={Return} exact />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productList' component={ProductListScreen} exact />
          <Route path='/admin/productList/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/cart/:id?' component={CartScreen} exact />
          <Route path='/wishlist/:id?' component={WishlistScreen} exact />
        </Container>
      </main>
      <img style={{ maxWidth: '100%' }} src={ftb.default} alt='Image not found' />
      <Footer />
    </Router>
  );
};

export default App;
