const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');
const DB = require('./src/database/config');
const Logger = require('./src/logger')('[SERVER]');

const AdminController = require('./src/controllers/AdminController');

const server = express();

server.use(express.json());
server.use(routes);

mongoose.connect(DB.DB_URL, DB.DB_SETTINGS, (err) => {
    if(!err) {
        Logger.print(`✔ Connected to MongoDB`);
        AdminController.createAdmin();
    } else {
        Logger.print(`✖ Error while connecting to MongoDB.\n${err}`);
    }
});

server.listen(process.env.SERVER_PORT, () => {
    Logger.print(`✔ Auth server running at port ${process.env.SERVER_PORT}`)
});