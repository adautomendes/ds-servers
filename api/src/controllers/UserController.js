const HttpStatus = require('http-status-codes');
const axios = require('axios');

module.exports = {
    async insert(req, res) {
        const { token } = req.headers;
        const { username, password } = req.body;

        let url = process.env.AUTH_SERVER + '/user';
        let postData = { username, password };
        let axiosConfig = {
            headers: {
                token
            }
        };

        console.log(`POST ${url} => ${JSON.stringify(postData)}`);
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
        const { username, password } = req.body;

        let url = process.env.AUTH_SERVER + '/user';
        let postData = { username, password };
        let axiosConfig = {
            headers: {
                token
            }
        };

        console.log(`PATCH ${url} => ${JSON.stringify(postData)}`);
        axios.patch(url, postData, axiosConfig)
            .then((response) => {
                return res.status(response.status).json(response.data);
            })
            .catch((error) => { //TODO: testar o que acontece se não passar o token
                return res.status(error.response.status).json(error.response.data);
            });
    },

    async search(req, res) {
        const { id } = req.params;
        const { token } = req.headers;

        let url = process.env.AUTH_SERVER + '/user';
        if (id)
            url += '/' + id;

        let axiosConfig = {
            headers: {
                token
            }
        };

        console.log(`GET ${url}`);
        axios.get(url, axiosConfig)
            .then((response) => {
                return res.status(response.status).json(response.data);
            })
            .catch((error) => { //TODO: testar o que acontece se não passar o token
                return res.status(error.response.status).json(error.response.data);
            });
    },

    async delete(req, res) {
        const { id } = req.body;
        const { token } = req.headers;

        let url = process.env.AUTH_SERVER + '/user';
        let data = { id };
        let headers = { token };

        console.log(`DELETE ${url} => ${JSON.stringify(data)}}`);
        axios.delete(url, { headers, data })
            .then((response) => {
                return res.status(response.status).json(response.data);
            })
            .catch((error) => { //TODO: testar o que acontece se não passar o token
                return res.status(error.response.status).json(error.response.data);
            });
    }
};