const HttpStatus = require('http-status-codes');
const axios = require('axios');

module.exports = {
    async insert(req, res) {
        const { title, duration, year } = req.body;

        return res.status(HttpStatus.OK).json({ ok : true });
    },

    async update(req, res) {
        const { id, title, duration, year } = req.body;

        return res.status(HttpStatus.OK).json({ ok : true });
    },

    async search(req, res) {
        const { id } = req.params;
        let movies = [];

        return res.status(HttpStatus.OK).json({ ok : true });
    },

    async delete(req, res) {
        const { id } = req.body;

        return res.status(HttpStatus.OK).json({ ok : true });
    }
};