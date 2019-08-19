const axios = require('axios');
const HttpStatus = require('http-status-codes');
const Logger = require('../logger')('[AUTH]');
require('dotenv').config();

module.exports = {

    async verifyJWT(req, res, next) {
        const { token } = req.headers;

        if (token == null)
            return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Token not provided.' });

        let url = process.env.AUTH_SERVER + '/auth/validateToken';
        let postData = {};
        let axiosConfig = {
            headers: {
                token
            }
        };

        axios.post(url, postData, axiosConfig)
            .then((response) => {
                Logger.print(`Token ${response.statusText}`);
                next();
            })
            .catch((error) => {
                Logger.print(`${error}`);
                return res.status(error.response.status).json(error.response.data);
            });
    }
};