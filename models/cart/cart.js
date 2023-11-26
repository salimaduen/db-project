import storeDB from '../../database/database.js';
import Product from '../product/product.js';
import CartItem from './cartItem.js';

class Cart {
    /**
     * 
     * @param {string} userID 
     */
    static async userHasCart(userID) {
        const conn = await storeDB.getConnection();
        const query = `SELECT * FROM Cart WHERE UserID = ?`;
        let hasCart = true;
        try {
            const results = await conn.query(query, [userID]);
            if (results.length == 0) {
                hasCart = false;
            }
        } catch (error) {
            console.error(error);
        } finally { 
            if (conn) await conn.release(); 
        }
        return hasCart;
    }


    /**
     * 
     * @param {String} userID 
     */
    static async createCart(userID) {
        const conn = await storeDB.getConnection();
        const query = 'INSERT INTO Cart(UserID) VALUES(?)';
        try {
            conn.query(query, [userID]);
        } catch(error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
    }

    /**
     * 
     * @param {String} userID 
     */
    static async getUserCartID(userID) {
        const conn = await storeDB.getConnection();
        const query = `SELECT * FROM Cart WHERE UserID = ?`;
        let results = null;
        try {
            results = (await conn.query(query, [userID]))[0];
            results = results.CartID;
        } catch (error) {
            console.error(error);
        } finally { 
            if (conn) await conn.release(); 
        }
        return results;
    }

    /**
     * 
     * @param {String} userID 
     * @param {String} slug
     */
    static async addProduct(userID, slug) {
        let product = (await Product.findBySlug(slug))[0];
        let cartID = await Cart.getUserCartID(userID);
        const item = new CartItem(cartID, product.ProductID);
        item.save();
        await Cart.#updateTotalPrice(userID);

    }

    static async #updateTotalPrice(userID) {
        const cartItems = await Cart.getCartItems(userID);
        let total = 0.0;
        for (let item of cartItems) {
            total += item.Price * item.Quantity;
        }
        const query = 'UPDATE Cart SET TotalPrice = ? WHERE UserID = ?';
        const conn = await storeDB.getConnection();
        try {
            conn.query(query, [total, userID]);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
    }

    /**
     * Function to get all cart items
     * @param {String} userID 
     */

    static async getCartItems(userID) {
        const conn = await storeDB.getConnection();
        const cartID = await Cart.getUserCartID(userID);
        const query = `SELECT Product.Name, Product.Price, CartItem.Quantity
                       FROM CartItem
                       INNER JOIN Product ON CartItem.ProductID = Product.ProductID
                       WHERE CartItem.CartID = ?`;
        let cartItems = null;

        try {
            cartItems = await conn.query(query, [cartID]);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
        return cartItems;
    }

    static async removeProduct() {

    }
}

export default Cart;