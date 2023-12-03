import storeDB from '../../database/database.js';

class Category {
    static tableName = 'Category';

    /**
     * 
     * @param {int} id 
     * @param {String} name 
     * @param {String} description 
     */
    constructor(id, name, description = null) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static async getAllCategories() {
        const conn = await storeDB.getConnection();
        const query = `SELECT Name FROM ${Category.tableName}`;
        let categories = null;
        try {
            categories = await conn.query(query);
        } catch(error){
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }

        return categories;
        // get all available categories
    }


    // save category to database;
    async save() {
        const conn = await storeDB.getConnection();
        const query = `INSERT INTO ${Category.tableName}(CategoryID, Name, Description)
                       VALUES (?, ?, ?)`;
        try {
            conn.query(query, [this.id, this.name, this.description]);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) await conn.release();
        }
    }

    static async removeCategory() {
        // remove a category
    }
}

export default Category;