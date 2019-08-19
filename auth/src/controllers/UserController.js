const HttpStatus = require('http-status-codes');

const User = require('../models/User');
const Logger = require('../logger')('[USER]');

module.exports = {
    async insert(req, res) {
        const { username, password } = req.body;

        //Testing if user already exists
        const userExists = await User.findOne({ username });

        if (userExists) {
            Logger.print(`'${username}' already exists.`);
            return res.status(HttpStatus.OK).json(userExists);
        }

        const user = await User.create({
            username,
            password
        });

        Logger.print(`'${username}' created!`);
        return res.status(HttpStatus.CREATED).json(user);
    },

    async update(req, res) {
        const { username, password } = req.body;

        const response = await User.updateOne({ username }, {
            password
        });

        if (response.nModified == 1 && response.ok == 1) {
            Logger.print(`'${username}' updated!`);
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
            Logger.print(`User '${users.username}' found!`);
        } else { //Find all
            users = await User.find();
            Logger.print(`${users.length} users found!`);
        }

        return res.status(HttpStatus.OK).json(users);
    },

    async delete(req, res) {
        const { id } = req.body;

        const response = await User.deleteOne({ _id: id });

        if (response.deletedCount == 1 && response.ok == 1) {
            Logger.print(`${id} removed!`);
            return res.status(HttpStatus.NO_CONTENT).json();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Invalid request' });
    }
};