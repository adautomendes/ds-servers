const express = require('express');
require('dotenv').config();

const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(routes);

server.listen(process.env.SERVER_PORT, () => {
    console.log(`✔ API server running at port ${process.env.SERVER_PORT}`)
});