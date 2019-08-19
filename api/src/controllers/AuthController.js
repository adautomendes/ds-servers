const HttpStatus = require('http-status-codes');
const axios = require('axios');
const Logger = require('../logger')('[AUTH]');
require('dotenv').config();

module.exports = {

    async login(req, res, next) {
        const { username, password } = req.body;

        let url = process.env.AUTH_SERVER + '/auth/login';
        let postData = { username, password };
        let axiosConfig = {};

        Logger.printRequest('POST', url, postData);
        axios.post(url, postData, axiosConfig)
            .then((response) => {
                return res.status(HttpStatus.OK).json({ token: response.data.token });
            })
            .catch((error) => {
                return res.status(error.response.status).json(error.response.data);
            });
    },

    async logout(req, res) {
        return res.status(HttpStatus.OK).json({ ok: true });
    },

    async tokenExists(req, res, next) {
        const { token } = req.headers;

        if (!token) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Token not provided.' });
        } else {
            next();
        }
    }
    
};