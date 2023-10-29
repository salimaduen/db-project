import Product from '../models/product/product.js';

class ProductController {

    async getProducts(req, res) {
        try {
            // TODO update so there's a MAX. per page
            const products = await Product.getAllProducts();

            // Send JSON of products TODO: render them to the page
            res.render('products', { products: products });
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

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

    async getProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            if (product && product.length > 0) {
                res.status(200).send(product);
            } else {
                res.status(404);
                res.send('Not found');
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

export default new ProductController();