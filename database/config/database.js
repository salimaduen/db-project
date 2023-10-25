import { Sequelize } from 'sequelize';
import dbConfig from './config.js';
import dotenv from 'dotenv';

dotenv.config();

function createDatabase() {

    const env = process.env.NODE_ENV || 'development';
    const config = dbConfig[env];

    const sequelize = new Sequelize({
        database: config.database,
        host: config.host,
        username: config.username,
        password: config.password,
        dialect: config.dialect,
        pool: config.pool
    });
    return sequelize;
}

async function syncDatabase() {
    await createDatabase().sync({force:true})
    .then(() => {
        console.log('Models have been successfully synced');
    })
    .catch( (err) => {
        console.log('Error: ' + err);
    });
}

const database = createDatabase();
export { createDatabase, syncDatabase, database };