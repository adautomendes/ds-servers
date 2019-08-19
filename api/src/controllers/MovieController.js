const HttpStatus = require('http-status-codes');
const axios = require('axios');
const Logger = require('../logger')('[USER]');

module.exports = {
    async insert(req, res) {
        const { token } = req.headers;

        let url = process.env.CORE_SERVER + '/movie';
        let postData = req.body;
        let axiosConfig = {
            headers: {
                token
            }
        };

        Logger.printRequest('POST', url, postData);
        axios.post(url, postData, axiosConfig)
            .then((response) => {
                return res.status(response.status).json(response.data);
            })
            .catch((error) => { //TODO: testar o que acontece se não passar o token
                return res.status(error.response.status).json(error.response.data);
            });
    },

    async update(req, res) {
        const { token } = req.headers;

        let url = process.env.CORE_SERVER + '/movie';
        let postData = req.body;
        let axiosConfig = {
            headers: {
                token
            }
        };

        Logger.printRequest('PATCH', url, postData);
        axios.patch(url, postData, axiosConfig)
            .then((response) => {
                return res.status(response.status).json(response.data);
            })
            .catch((error) => { //TODO: testar o que acontece se não passar o token
                return res.status(error.response.status).json(error.response.data);
            });
    },

    async search(req, res) {
        const { token } = req.headers;
        const { id } = req.params;

        let url = process.env.CORE_SERVER + '/movie';
        if (id)
            url += '/' + id;

        let axiosConfig = {
            headers: {
                token
            }
        };

        Logger.printRequest('GET', url);
        axios.get(url, axiosConfig)
            .then((response) => {
                return res.status(response.status).json(response.data);
            })
            .catch((error) => { //TODO: testar o que acontece se não passar o token
                return res.status(error.response.status).json(error.response.data);
            });
    },

    async delete(req, res) {
        const { token } = req.headers;
        const { id } = req.body;

        let url = process.env.CORE_SERVER + '/movie';
        let axiosConfig = {
            headers: { token },
            data: { id }
        };

        Logger.printRequest('DELETE', url, axiosConfig.data);
        axios.delete(url, axiosConfig)
            .then((response) => {
                return res.status(response.status).json(response.data);
            })
            .catch((error) => { //TODO: testar o que acontece se não passar o token
                return res.status(error.response.status).json(error.response.data);
            });
    }
};