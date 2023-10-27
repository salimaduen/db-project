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
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USERNAME || 'default',
            database: process.env.DB_NAME || 'database',
            password: process.env.DB_PASSWORD || '12345',
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
        const __dirname = path.join(path.dirname(__filename), '/models/');

        const queue = await this.#getModelDirs(__dirname);

        if ( !(queue.length >= 1) ) {
            return console.log('no models found at ' + __dirname);
        }
        

        while (queue.length > 0) {
            let curr = queue.shift();
            await this.syncSQL(curr);
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
    async syncSQL(__dirname) {
        const files = await readdir(__dirname);

        for (const file of files) {
            if (!(path.extname(path.join(__dirname, file)) === '.sql')) {
                // TODO add check if file is .model.sql
                // if file extension not .sql goto next
                continue;
            }
            try {
                const table = await readFile(path.join(__dirname, file), 'utf-8');
                // TODO - maybe add a function that checks if query is ok
                if (table.length > 0) {
                    const conn = this.getConnection();
                    (await conn).query(table);
                    console.log(table);
                }
            } catch (error) {
                console.log('Error reading sql file: ' + error);
            }
        }
    }
}

export default new storeDB();