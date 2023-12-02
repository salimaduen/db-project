import express from 'express';
import checkoutController from '../controllers/checkoutController.js';

const router = express.Router();

router.get('/checkout', checkoutController.checkoutPage);
router.post('/checkout', checkoutController.processCheckout);


export default router;

