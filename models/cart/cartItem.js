import storeDB from '../../database/database.js';
import Product from '../product/product.js';

class CartItem {


    /**
     * 
     * @param {int} cartID 
     * @param {int} productID 
     * @param {int} quantity 
     */
    constructor(cartID, productID, quantity = 1) {
        this.cartID = cartID;
        this.productID = productID;
        this.quantity = quantity;
    }

    /**
     * 
     * @param {*} conn 
     * @returns {boolean}
     */
    async #isItemInCart(conn) {
        const query = 'SELECT * FROM CartItem WHERE ProductID = ? AND CartID = ?';
        let isInCart = true;
        try {
            const results = await conn.query(query, [this.productID, this.cartID]);
            if (results.length == 0) {
                isInCart = false;
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
        return isInCart;
    }

    /**
     * function to save cartItem in db
     * @returns {boolean}
     */
    async save() {
        const conn = await storeDB.getConnection();
        let query = '';
        console.log(`CART ID: ${this.cartID} AND PRODUCTID: ${this.productID}`);
        try {
            
            // first make sure there is enough stock
            const stock = (await Product.findById(this.productID))[0].StockQuantity;
            if (this.quantity > stock) {
                console.log('Not enough stock');
                return false;
            }
    
            if (! (await this.#isItemInCart(conn))) {
                // if item is not on cart it will insert

                query = 'INSERT INTO CartItem(CartID, ProductID, Quantity) VALUES(?, ?, ?)';
                conn.query(query, [this.cartID, this.productID, this.quantity]);
            } else {
                query = 'SELECT Quantity FROM CartItem WHERE ProductID = ? AND CartID = ?';
                // if item is in cart get the current quantity
                this.quantity += (await conn.query(query, [this.productID, this.cartID]))[0].Quantity;
                if (this.quantity > stock) {
                    console.log(`QUANTITY: ${this.quantity} STOCK: ${stock}`);
                    console.log('Not enough stock');
                    return false;
                }

                // update quantity
                query = 'UPDATE CartItem SET Quantity = ? WHERE ProductID = ? AND CartID = ?';
                conn.query(query, [this.quantity, this.productID, this.cartID]);
            }

        } catch(error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }

        return true;
    }
}

export default CartItem;