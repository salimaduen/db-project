import express from 'express';
import productController from '../controllers/product/productController.js';

var router = express.Router();


/* GET products listing. */

router.get('/', productController.getProducts);
router.get('/:slug', productController.getProductBySlug);
router.get('/category/:category', productController.filterByCategory);
router.post('/filter-by-category', productController.filterRedirect);


export default router;