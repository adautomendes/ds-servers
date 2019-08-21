const User = require('../models/User');
const PasswordUtil = require('../utils/PasswordUtil');
const Logger = require('../logger')('[ADMIN]');

module.exports = {
    async createAdmin() {
        let admin = {
            username: 'admin',
            password: await PasswordUtil.cryptPassword('admin')
        };

        //Testing if user already exists
        const userExists = await User.findOne({ username: admin.username });

        if (userExists) {
            Logger.print(`✔ Admin already created`);
            return;
        }

        admin = await User.create(admin);

        if (admin) {
            Logger.print(`✔ Admin created successfully`);
            return;
        }
    }
};