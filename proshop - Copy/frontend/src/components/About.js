import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <h2 className='my-5'>About Us</h2>
      <p>An E-Commerce Company emerged from the United Arab of Emirates. We are the space for all creative, authentic, original, unique & exclusive items. Mansa Musa is your destination for creative handmade items in different categories from different independent artists, designers, formulators and hand crafters. Our ultimate goal is to celebrate the empowerment of self-expression from both sides the buyer & creative person the seller who made the items so special & with so much thoughts for their customers unique taste to match a comfortable and luxurious lifestyle. We aim to bring you the world first class E-commerce platform experience and provide you the needed to start the thrill & hunt feels in your lifestyle journey. Have fun exploring the platform and to let us know your thoughts or questions feel free to share it with us via Info@mansamusa.ae.</p>
      <Link className='btn btn-dark my-3' to='/'>
        Home
      </Link>
    </>
  );
};

export default About;
