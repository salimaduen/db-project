export default {
    testing: {
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    },
    development: {
        username: "your_username2",
        password: "your_password",
        database: "your_database",
        host: "localhost",
        dialect: "mysql",
        define: {
          underscored: true,
          timestamps: false
        },
        pool: {
            max: 3,
            min: 0,
            acquire: 15000,
            idle: 5000
        }
      }
};