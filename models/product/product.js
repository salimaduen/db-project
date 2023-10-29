import database from '../../database.js';

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
        // get product by id
    }

    static async getAllProducts() {
        // get all products
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