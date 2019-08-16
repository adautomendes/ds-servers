require('dotenv').config();

module.exports = {
    DB_URL: process.env.DB_URL,

    DB_SETTINGS: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        dbName: process.env.DB_NAME
    }
};

