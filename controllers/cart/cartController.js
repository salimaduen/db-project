import Cart from '../../models/cart/cart.js';

class cartController {
    async addToCart(req, res) {
        const productSlug = req.params.slug;
        // check if user has a cart
        if (! await Cart.userHasCart(req.session.userID)) {
            Cart.createCart(req.session.userID);
        }

        Cart.addProduct(req.session.userID, productSlug);

        res.redirect('/cart');
    }

    async getCart(req, res) {
        const items = await Cart.getCartItems(req.session.userID);
        res.render('cart', {items: items, stylesheets: '/stylesheets/cart.css'});
    }
}

export default new cartController;