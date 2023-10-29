import storeDB from '../../database/database.js';

class Product {

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} description 
     * @param {int} price 
     * @param {int} stockQuantity 
     * @param {int} categoryId 
     */
    constructor(id, name, price, stockQuantity, description = null, categoryId = null ) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.stockQuantity = stockQuantity;
            this.categoryId = categoryId;
    }

    static async findBySlug(productSlug) {
        // get product by slug
    }

    static async findById(productId) {
        let product = null;
        const conn = await storeDB.getConnection();
        const query = 'SELECT * FROM Product WHERE ProductID = ?';
        try {
            product = await conn.query(query, [productId]);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
        return product;
    }

    static async getAllProducts() {
        let product = null;
        const conn = await storeDB.getConnection();
        const query = 'SELECT * FROM Product';
        try {
            product = await conn.query(query);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
        return product;
    }

    static async save() {
        // add product to db
    }

    static async update() {
        // update an existing product
    }

    /**
     * function will create a slug based on the product name
     * @param {String} productName 
     */
    #createSlug(productName) {
        // remove any special characters from string
        let slug = productName.replace(/[^\w\s-]/g, '');

        // lower cases
        slug = slug.toLowerCase();

        // replaces all whitespaces for hyphens (-)
        slug = slug.replace(/[\s+]/g, '-');

        // makes sure there's not more than one hyphen at the time
        slug = slug.replace(/[-+]/g, '-')
        return slug;
    }
}

export default Product;