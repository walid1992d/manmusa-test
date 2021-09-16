import React from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {
  return (
    <>
      <h2 className='my-5'>FAQ</h2>
      <h4 className='my-3'>Do I need to create an account?</h4>
      <p>You do not need to create an account in order to shop on Mansa Musa, but you will enjoy a host of additional benefits if you register your information with us, such as:</p>
      <ul className='mb-5'>
        <li>Track your orders and review previous purchases</li>
        <li>Request to return a product directly through the account</li>
        <li>Viewing new designs and collections, and receiving e-mails about the latest news and new products</li>
        <li>Record your address and payment card information in order to speed up the completion of the shopping process when you visit the site again</li>
      </ul>

      <h4 className='my-3'>Will my personal data be confidential?</h4>
      <p className='mb-5'>We pay great attention to data protection in Mansa Musa, as the information you provide to us through our website is saved on secure servers, and any payments made through the site are encrypted using secure socket layer technology, and none of our employees is allowed to view your card data or words Your password, but please bear in mind that you are responsible for maintaining the confidentiality of any passwords or login codes for our website that have been previously issued to you or that you have chosen yourself. We may share information with carefully selected third parties with caution when taking this action. For full details regarding our handling of data, please read our privacy policy.</p>

      <h4 className='my-3'>How can I search for a specific product?</h4>
      <p className='mb-5'>You can search by brand, product identification number or description using the search bar at the top right of the page. If you cannot access the product you are looking for, please email us at info@mansamusa.ae</p>

      <h4 className='my-3'>How do I know that a product is out of stock?</h4>
      <p className='mb-5'>Next to the product, a 'Not currently available' mark will appear if this product is out of stock, and it may happen, in rare cases, that the product is available when you place the order, but it is executed while we process the order. In the event of such occurrence, we will inform you of the matter.</p>
      <h4>Are gift cards available?</h4>
      <p className='mb-5'>We do not offer gift cards at this time, but we are working on preparing this service so please check our website regularly for the latest services or contact the customer service team.</p>

      <h4 className='my-3'>When is Mansa Musa Sales?</h4>
      <p className='mb-5'>Mansa Musa performs sales four times a year every beginning of the season. Register your information with us to receive news of the sales updates via e-mail and to see the dates of other sales and discounts.</p>
      <h4>What should I do if I encounter a problem logging into my personal account on Mansa Musa?</h4>
      <p className='mb-5'>If you registered your data and then forgot your password, please follow the usual instructions. Forgot your password and follow the steps shown on the website.</p>

      <h4 className='my-3'>What are the places that can be shipped to from Mansa Musa? </h4>
      <p className='mb-5'>Mansa Musa provides its services exclusively to the United Arab Emirates, and we do not currently ship our products to anywhere else in the world.</p>
      <Link className='btn btn-primary my-3' to='/'>
        Home
      </Link>
    </>
  );
};

export default Faq;
