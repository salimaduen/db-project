import mariadb from 'mariadb';
import { readFile, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// load env variables
dotenv.config();


class storeDB {
     constructor() {
        this.pool = mariadb.createPool({
            host: process.env.DB_HOST || '174.48.236.56',
            user: process.env.DB_USERNAME || 'susell',
            database: process.env.DB_NAME || 'store',
            password: process.env.DB_PASSWORD || 'test123*',
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
     * Function will create an individual table to the db.
     * @param {string} table - path/location to the table
     */
    async syncTable(table) {

    }

    /**
     * 
     * Sync function will look at models folder, .model.sql files
     * and create table if not exists.
     */
    async sync() {

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.join(path.dirname(__filename), '../models/');

        const queue = await this.#getModelDirs(__dirname);

        if ( !(queue.length >= 1) ) {
            return console.log('no models found at ' + __dirname);
        }
        

        while (queue.length > 0) {
            let curr = queue.shift();
            await this.#syncSQL(curr);
        }

    }


    /**
     * Function will read all dirs in the received path and
     * add them to a queue
     * @param {string} __dirname - path to models dir
     * @returns a queue with all the model dirs
     */
    async #getModelDirs(__dirname) {
        const queue = [];
        const files = await readdir(__dirname);
        files.forEach( (file) => { 
            queue.push(path.join(__dirname, file, '/'));
        });
        return queue;
    }


    /**
     * function will look for model sql files on each folder
     * and create table if not exists.
     * @param {string} __dirname - path to a model folder
     */
    async #syncSQL(__dirname) {
        const files = await readdir(__dirname);

        for (const file of files) {
            const curr_path = path.join(__dirname, file);
            if (this.#isFileModel(file)) {
                const conn = this.getConnection();
                try {
                    const table = await readFile(path.join(__dirname, file), 'utf-8');
                    // TODO - maybe add a function that checks if query is ok
                    if (table.length > 0) {
                        (await conn).query(table);
                    }
                } catch (error) {
                    console.log('Error reading sql file: ' + error);
                } finally {
                    if (conn) (await conn).release();
                }
            }

        }
    }

    /**
     * function will check if the file is .model.sql
     * @param {string} __filename
     * @returns if it's a valid file model true/false
     */
    #isFileModel(__filename) {
        const nameParts = __filename.split('.');
        if (nameParts.length != 3) {
            return false;
        } else if (nameParts[nameParts.length - 1] === 'sql' && nameParts[nameParts.length - 2] === 'model') {
            return true;
        } else {
            return false;
        }
    }
}

export default new storeDB();