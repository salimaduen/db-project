import database from '../../database.js';

class Product {

    static async getProduct(productSlug) {
        // get a specific product
    }

    static async getAllProducts() {
        // get all products
    }

    static async addProduct() {
        // add product to db
    }

    static async modifyProduct() {
        // modify an existing product
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