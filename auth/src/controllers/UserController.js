const HttpStatus = require('http-status-codes');

const User = require('../models/User');

module.exports = {
    async insert(req, res) {
        const { username, password } = req.body;

        //Testing if user already exists
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(HttpStatus.OK).json(userExists);
        }

        const user = await User.create({
            username,
            password
        });

        return res.status(HttpStatus.CREATED).json(user);
    },

    async update(req, res) {
        const { username, password } = req.body;

        const response = await User.updateOne({ username }, {
            password
        });

        if (response.nModified == 1 && response.ok == 1) {
            const user = await User.find({ username });
            return res.status(HttpStatus.OK).json(user);
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Invalid request' });
    },

    async search(req, res) {
        const { id } = req.params;
        let users = [];

        if (id) { //Find one
            users = await User.findById(id);
        } else { //Find all
            users = await User.find();
        }

        return res.status(HttpStatus.OK).json(users);
    },

    async delete(req, res) {
        const { id } = req.body;

        const response = await User.deleteOne({ _id: id });

        if (response.deletedCount == 1 && response.ok == 1) {
            return res.status(HttpStatus.NO_CONTENT).json();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Invalid request' });
    }
};