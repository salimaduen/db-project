export default {
    testing: {
        username: 'test',
        password: '12345',
        database: 'store',
        dialect: 'mysql',
        logging: true
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