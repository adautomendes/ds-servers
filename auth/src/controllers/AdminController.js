const User = require('../models/User');
const Logger = require('../logger')('[ADMIN]');

module.exports = {
    async createAdmin() {
        const admin = {
            username: 'admin',
            password: 'admin'
        };

        //Testing if user already exists
        const userExists = await User.findOne({ username: admin.username });

        if (userExists) {
            Logger.print(`✔ Admin already created`);
            return;
        }

        const user = await User.create(admin);

        if (user) {
            Logger.print(`✔ Admin created successfully`);
            return;
        }
    }
};