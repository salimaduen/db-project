import dbConfig from './config/config.js';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import { readFile } from 'fs';

dotenv.config();

class storeDB {
     constructor() {
        const env = process.env.NODE_ENV || 'development';
        const config = dbConfig[env];

        this.pool = mariadb.createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            connectionLimit: 5
        });
    }

    /**
     * 
     * @returns connection from the pool
     */
    async getConnection() {
        return this.pool.getConnection();
    }

    /**
     * Function will sync an individual table to the db
     * @param {String} table - the string file location to the table
     */
    async syncTable(table) {

    }

    async sync() {
        
    }
}

export default new storeDB();