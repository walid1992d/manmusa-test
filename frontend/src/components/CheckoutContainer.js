import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeCheckoutForm } from './StripeCheckoutForm';

const PUBLIC_KEY = 'pk_test_51IyBO5HXmYxbR47YMBMG9iMLY3EjWKVqjSduCx1tqGhhG14DQr6m6LplQhIedwNdgROyuwS44jPrCelgfKnEqFdK00wn2GB0Ov';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const CheckoutContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <StripeCheckoutForm />
    </Elements>
  );
};

export default CheckoutContainer;
