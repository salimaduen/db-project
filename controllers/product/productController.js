import Product from '../../models/product/product.js';


class ProductController {

    async getProducts(req, res) {
        try {
            // TODO update so there's a MAX. per page
            const products = await Product.getAllProducts();

            let rows = 0;

            if ( (products.length % 4) === 0) {
                rows = products.length / 4;
            } else {
                rows = Math.floor((products.length / 4)) + 1;
            }

            // Send JSON of products TODO: render them to the page
            res.render('products', { products: products, rows: rows });
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    async getProductBySlug(req, res) {
        const productSlug = req.params.slug;
        try {
            console.log('AKI');
            const product = await Product.findBySlug(productSlug);
            if (product.length > 0) {
                res.status(200);
                res.render('productPage', {product: product[0]});
            } else {
                res.status(404);
                res.render('error');
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