import express from 'express';
const router = express.Router();

import { getLocation, createPreOrder, createOrder } from '../controllers/deliveryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getLocation);
router.route('/preorder').post(createPreOrder);
router.route('/order').post(createOrder);
export default router;
