import { Sequelize } from 'sequelize';
import dbConfig from './config.js';

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


export default createDatabase;