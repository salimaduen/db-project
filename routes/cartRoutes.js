import express from 'express';
import cartController from '../controllers/cart/cartController.js';

const router = express.Router();

router.get('/add-to-cart/:slug', cartController.addToCart);
router.get('/cart', cartController.getCart);

export default router;