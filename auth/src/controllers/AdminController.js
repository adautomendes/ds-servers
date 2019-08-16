const User = require('../models/User');

module.exports = {
    async createAdmin() {
        const admin = {
            username: 'admin',
            password: 'admin'
        };

        //Testing if user already exists
        const userExists = await User.findOne({ username: admin.username });

        if (userExists) {
            console.log(`✔ Admin already created`);
            return;
        }

        const user = await User.create(admin);

        if (user) {
            console.log(`✔ Admin created successfully`);
            return;
        }
    }
};