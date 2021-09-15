import express from 'express';
const router = express.Router();

import { createSession, getData } from '../controllers/checkoutController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/data').post(getData);
router.route('/').post(createSession);

export default router;
