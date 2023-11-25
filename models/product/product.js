import storeDB from '../../database/database.js';

class Product {

    static tableName = 'Product';

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} description 
     * @param {int} price 
     * @param {int} stockQuantity 
     * @param {int} categoryId 
     */
    constructor(id, name, price, stockQuantity=0, description = null, categoryId = null ) {
            this.id = id;
            this.name = name;
            this.slug = this.#createSlug(name)
            this.description = description;
            this.price = price;
            this.stockQuantity = stockQuantity;
            this.categoryId = categoryId;
    }

    static async findBySlug(productSlug) {
        let product = null;
        const conn = await storeDB.getConnection();
        const query = 'SELECT * FROM Product WHERE Slug = ?';
        try {
                product = await conn.query(query, productSlug);
                //console.log(product);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
        return product;
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
        const query = `SELECT * FROM ${Product.tableName}`;
        try {
            product = await conn.query(query);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
        return product;
    }

    async save() {
        // add product to db
        const query = `INSERT INTO ${Product.tableName}(ProductID, Name, Description, Price, Slug, StockQuantity, CategoryID)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const conn = await storeDB.getConnection();
        try {
            await conn.query(query, [ this.id, this.name, this.description, this.price, this.slug, this.stockQuantity, this.categoryId]);
            await conn.commit();
        } catch(error) {
            console.error(error);
        } finally {
            if (conn) await conn.release;
        }
        
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