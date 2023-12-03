import Product from '../../models/product/product.js';
import Category from '../../models/category/category.js';

function calculateRows(productsLength) {
    let rows = 0;

    if ( (productsLength % 4) === 0) {
        rows = productsLength / 4;
    } else {
        rows = Math.floor((productsLength / 4)) + 1;
    }

    return rows;
}


class ProductController {
    

    async getProducts(req, res) {
        try {
            // TODO update so there's a MAX. per page
            const products = await Product.getAllProducts();

            let rows = calculateRows(products.length);

            const categories = await Category.getAllCategories();
            // Send JSON of products TODO: render them to the page
            console.log(categories);
            res.render('products', { products: products, rows: rows , categories: categories, stylesheets: '/stylesheets/products.css'});
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    async getProductBySlug(req, res) {
        const productSlug = req.params.slug;
        try {
            const product = await Product.findBySlug(productSlug);
            if (product.length > 0) {
                res.status(200);
                res.render('productPage', {product: product[0], stylesheets: '/stylesheets/products.css'});
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

    async filterRedirect(req, res) {
        const category = req.body.category;
        res.redirect(`/products/category/${category}`);
    }

    async filterByCategory(req, res) {
        const category = req.params.category;
        const products = await Product.getProductsByCategory(category);
        console.log(products);
        const rows = calculateRows(products.length);
        const categories = await Category.getAllCategories();

        
        res.render('products', {products: products, rows: rows , categories: categories, stylesheets: '/stylesheets/products.css'})
    }


}

export default new ProductController();