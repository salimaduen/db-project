import Product from '../models/product/product.js';

class ProductController {

    async getProductBySlug(req, res) {
        const productSlug = req.params.slug;
        try {
            const product = await Product.findBySlug(productSlug);
            if (product) {
                res.status(200);
            } else {
                res.status(404);
            }
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    async addProduct(req, res) {
        // add product code
    }
}

export default new Product();