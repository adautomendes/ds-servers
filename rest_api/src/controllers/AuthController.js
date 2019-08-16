const HttpStatus = require('http-status-codes');
const axios = require('axios');
require('dotenv').config();

module.exports = {

    async login(req, res, next) {
        const { username, password } = req.body;

        let url = process.env.AUTH_SERVER + '/auth/login';
        let postData = { username, password };
        let axiosConfig = {};

        axios.post(url, postData, axiosConfig)
            .then((response) => {
                console.log(`✔ Token ${response.statusText}`);
                return res.status(HttpStatus.OK).json({ token: response.data.token });
            })
            .catch((error) => {
                console.log(`✖ ${error}`);
                return res.status(error.response.status).json(error.response.data);
            });
    },

    async logout(req, res) {
        return res.status(HttpStatus.OK).json({ ok: true });
    },

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
                console.log(`✔ Token ${response.statusText}`);
                next();
            })
            .catch((error) => {
                console.log(`✖ ${error}`);
                return res.status(error.response.status).json(error.response.data);
            });
    }
    
};