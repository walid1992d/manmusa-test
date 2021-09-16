import asyncHandler from 'express-async-handler';
import axios from 'axios';

// @desc    get delivery location
// @route   GET /api/delivery
// @access  Private

const getLocation = asyncHandler(async (req, res) => {
  try {
    const url = `https://ahoydev.azure-api.net/merchant/merchantlocations?subscriptionkey=${process.env.DELIVERY_KEY}`;

    const config = {
      headers: {
        'Ocp-Apim-Subscription-Key': '2124c374991d47ceb7ac870e82a5fd04'
      }
    };

    const { data } = await axios.get(url, config);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

const createPreOrder = asyncHandler(async (req, res) => {
  try {
    const url = `https://ahoydev.azure-api.net/delivery/deliveryservice?subscriptionkey=${process.env.DELIVERY_KEY}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '2124c374991d47ceb7ac870e82a5fd04'
      }
    };

    const { PickupLocationId, CompanyOrderTrackId, OrderMidBoxQuantity, CustomerName, CustomerPhone, CustomerEmail, CustomerAddress, CustomerLatitude, CustomerLongitude, IsCashPayment, IsCardPayment, PaymentAmount, CustomerAddressTypeId, CustomerAddressNote, Area, Building, Floor, Unit, TemperatureTypeId } = req.body;

    const { data } = await axios.post(url, { PickupLocationId, CompanyOrderTrackId, OrderMidBoxQuantity, CustomerName, CustomerPhone, CustomerEmail, CustomerAddress, CustomerLatitude, CustomerLongitude, IsCashPayment, IsCardPayment, PaymentAmount, CustomerAddressTypeId, CustomerAddressNote, Area, Building, Floor, Unit, TemperatureTypeId }, config);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    const url = `https://ahoydev.azure-api.net/delivery/deliveryrequest?subscriptionkey=${process.env.DELIVERY_KEY}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '2124c374991d47ceb7ac870e82a5fd04'
      }
    };

    // const { preOrderId, deliveryServiceTypeId, timeSlot } = req.body;
    const { preOrderId, deliveryServiceTypeId } = req.body;

    const { data } = await axios.post(url, { preOrderId, deliveryServiceTypeId }, config);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export { getLocation, createPreOrder, createOrder };
