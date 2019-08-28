require('dotenv').config();

module.exports = {
    DB_URL: process.env.DB_URL,

    DB_SETTINGS: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        dbName: process.env.DB_NAME
    }
};

