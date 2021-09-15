import React from 'react';
import { Link } from 'react-router-dom';

const Return = () => {
  return (
    <div>
      <h2 className='my-5'>Returns</h2>
      <h4 className='my-3'>Running Smoothly</h4>
      <p>Subject to meeting the conditions set out in this Returns and Exchanges section, we offer a “no questions asked" free-returns policy the delivery fee shall be paid by the buyer which allows you to return delivered items to us for any reason up to 14 days after the delivery of your Order, free of charge with the buyer bearing the value of the delivery. In order to qualify for a refund, all items (including promotional gift items accompanying the Order) must be returned to us within 14 days of Order receipt with the following conditions:</p>
      <ul className='mb-5'>
        <li>Items must be unaltered, unused and in full sellable condition (or the condition in which they were received from us or our agents). Shoes must be in brand-new condition and without any damage.</li>
        <li>Items must be in their original packaging/box/dust-cover and with all brand and product labels/tags/instructions still attached. Authenticity cards, where provided, should also be returned. Swimwear must have the original hygiene liner attached.</li>
        <li>The return must be accompanied by the original Order confirmation.</li>
        <li>Please note, beauty items, grooming items, underwear and earrings cannot be returned.</li>
      </ul>

      <h4 className='my-3'>Returns Process</h4>
      <p>Items can be returned by arranging collection from your delivery address in the UAE by following the steps below:</p>
      <ul className='mb-5'>
        <li>Items must be unaltered, unused and in full sellable condition (or the condition in which they were received from us or our agents). Shoes must be in brand-new condition and without any damage.</li>
        <li>Items must be in their original packaging/box/dust-cover and with all brand and product labels/tags/instructions still attached. Authenticity cards, where provided, should also be returned. Swimwear must have the original hygiene liner attached.</li>
        <li>The return must be accompanied by the original Order confirmation.</li>
        <li>Please note, beauty items, grooming items, underwear and earrings cannot be returned.</li>
      </ul>

      <h4 className='my-3'>Refund Process</h4>
      <p>Refunds will only be processed after completing the Return Process and the item/s returned have been approved. After approval, we will issue a refund of the full face value of undamaged items duly returned (excluding, where applicable, the original delivery charges and cash-handling fees). Your refund will be processed via the following methods:</p>
      <ul className='mb-5'>
        <li>Credit Card payments are refunded back to the card used in the purchase.</li>
        <li>Cash on Delivery payments are refunded as store credit.</li>
        <li>The return must be accompanied by the original Order confirmation.</li>
        <li>If you choose to pay with multiple payment methods, the store credit amount used will be prioritized and refunded in full, before the remainder of the payment gets refunded via the other payment method used. The refund will be processed in the following order: (i) The full store credit amount used will be credited back to your account, (ii) The remaining amount will be refunded via your other payment method.</li>
      </ul>

      <h4 className='my-3'>Item Return Policies</h4>
      <h5 className='my-3'>Damaged Goods and Incorrectly-Fulfilled Orders</h5>
      <p className='mb-5'>If you receive an item that is damaged or not the product you ordered, please arrange for return of the item to us using the Returns Process above. The item must be returned in the same condition you received it in within 14 days of receipt to qualify for a full refund. Where applicable, the refund will include the original Order delivery charges, cash-handling fees, taxes and any duties. Replacements may be available depending on stock. If an item has a manufacturing defect, it may also benefit from a manufacturer’s defects warranty. If you believe your item is defective, please reach us on Info@mansamusa.ae</p>

      <h5 className='my-3'>Shoes</h5>
      <p className='mb-5'>Shoe returns will only be accepted if the items are in brand-new condition and without any damage to the items or their packaging. To avoid damage, shoes should only be tried on carpeted surfaces. Any items returned with scuffing, scratches, dents, any type of damage and visible signs of wear will not be accepted and will be returned to the customer with a rejected refund request.</p>

      <h5 className='my-3'>Non-Returnable Items</h5>
      <p className='mb-5'>Furniture, beauty and grooming items (including skincare, fragrance, make-up and haircare), underwear, face masks and earrings cannot be returned.</p>

      <h5 className='my-3'>Packaging</h5>

      <p className='mb-5'>Please take care to preserve the condition of any product packaging as, for example, damaged shoe boxes may prevent re-sale and may mean that we cannot give you a full refund. Our agents may ask to inspect returned items at the point of collection but that initial inspection does not constitute a guarantee of your eligibility for a full refund.</p>
      <h5 className='my-3'>Gifted Items</h5>

      <p className='mb-5'>Gifted items and items in gift orders can only be returned with a refund given to the purchaser of the gift.</p>

      <h4 className='my-3'>Exchanges</h4>

      <p className='mb-5'>We are not currently able to offer Exchanges. Instead, all items should follow the returns process, and a new Order placed for the replacement items. We pride ourselves on the high quality product at Mansa Musa. So, if your product is damaged or has a fault, we want to know about it. Please contact our customer care team on email info@mansamusa.ae We reserve the right to monitor returns and to refuse Orders from customers with excessive returns levels. However nothing in this Returns section is intended to affect any consumer rights that you may have under UAE law.</p>
      <Link className='btn btn-dark my-3' to='/'>
        Home
      </Link>
    </div>
  );
};

export default Return;
