import express from 'express';
const router = express.Router();
import { getPassword, newPassword, createNewPassword } from '../controllers/forgotController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(getPassword);
router.route('/reset-password/:id/:token').get(newPassword).post(createNewPassword);

export default router;
