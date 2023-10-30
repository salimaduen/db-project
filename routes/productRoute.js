import express from 'express';
import productController from '../controllers/productController.js';

var router = express.Router();


/* GET products listing. */

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/:slug', productController.getProductBySlug);


export default router;