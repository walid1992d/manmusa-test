import React from 'react';
import { Link } from 'react-router-dom';

const Shipping = () => {
  return (
    <>
      <h2 className='my-5'>Shipping & Delivery</h2>
      <h4 className='my-3'>Running Smoothly</h4>
      <p className='mb-5'>In support of you and our community during this lockdown, we’ve received all the necessary approvals for delivery as usual within the UAE. We're working hard to fulfill every one of your wishes, however, due to high order volume, limited slots may be available.</p>

      <h4 className='my-3'>Order Delivery</h4>
      <p className='mb-5'>Mansa Musa don’t offers delivery across the GCC. The order delivery methods which are currently not available. However, we constantly strive to improve customer experience and may introduce additional delivery or collection methods across our channels. Please check back frequently to see if more options have become available to suit your preference. Deliveries take place between 9:00am - 11:59pm. * Orders placed outside of working hours (9am-8pm), after the cut-off time and/or during any UAE public holiday will be deemed placed on the first UAE working day following the Order's submission. Delivery timelines are estimates, see further details below. Order delivery may face delays during promotional activity, sale season and bank holidays — during this time, next-day delivery may not be available. We reserve the right to impose a re-delivery charge where your Order is not accepted at the address supplied to us on the confirmed date of delivery. Please note that orders paid for by Cash on Delivery attract a 10 AED delivery fee.</p>

      <h4 className='my-3'>General Delivery Conditions</h4>
      <p className='mb-5'>Although we are strongly committed to delivering in the timelines estimated in our Order confirmation or displayed on our Website or above, delivery timelines are estimates only. Time shall not be considered of the essence. Timelines start from Order confirmation. However, if we have not delivered your Order within 30 days of Order confirmation, we will provide you with a full refund. We are not responsible for failures to deliver for reasons outside our reasonable control, including where you are not available to take delivery of your Order or request postponement. Orders are delivered daily excluding UAE public holidays. It is your duty to ensure appropriate access for deliveries, including in particular but without limitation on Fridays.</p>

      <h4 className='my-3'>Delivery of Furniture or Bulky Items</h4>
      <p className='mb-5'>All furniture orders are final and non-returnable. When your Order is ready for delivery, we will contact you to agree a delivery date. Once agreed, you will be responsible for accepting delivery and arranging appropriate means of access and installation on that date. It is your responsibility to ensure that our delivery team has access to the delivery address, and that sufficient space for the goods is available, hallways are measured and doors and lifts can grant full access. Delivery on the first floor and above requires service elevator access arranged by you and it is your responsibility to notify us of any potential problems with access to the premises, building, service elevators, etc… and make any related delivery arrangements. Where delivery is complicated by such factors, additional charges may apply. If you fail to agree a revised delivery date falling within thirty (30) days of the initial delivery date, we retain the right to cancel your Order, retain all monies paid and resell the goods with no further liability. If on the delivery date our delivery team is unable to obtain access to the delivery address, a reasonable re-delivery charge may be applied. We will pre-inform you of this charge. In the absence of negligence, we will not be liable for loss or damage to the goods or your property, including where caused by: (i) us following your specific instructions; (ii) limited or no access to your nominated premises; and/or (iii) goods not fitting into your property. Any request to hang, erect or build items shall be at our discretion and we will not be responsible for any damage to your home in connection with such hanging, erection or building, nor for the integrity of such hanging, erection or building. Additional charges for such services may apply.</p>
      <h4 className='my-3'>Address Changes & Tracking</h4>
      <p className='mb-5'>Our Customer Care team will be happy to assist with changing your preferred delivery date and address should you require. However, if you have received an email informing you that your order has been dispatched, we won’t be able to change your address. Please note that a change to an address outside of the original delivery country will not be possible. A tracking number will be provided by SMS once your order is confirmed. You will then be able to use the tracking number to track your order by contacting the customer care team on email info@mansamusa.ae.</p>
      <Link className='btn btn-dark my-3' to='/'>
        Home
      </Link>
    </>
  );
};

export default Shipping;
