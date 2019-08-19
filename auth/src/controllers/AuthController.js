const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Logger = require('../logger')('[AUTH]');

module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username, password });

            if (user != null) {
                var token = jwt.sign({ id: user._id }, process.env.SECRET, {
                    expiresIn: '1d'
                });

                Logger.print(`User '${username}' logged in.`);

                return res.status(HttpStatus.OK).json({ token });
            } else {
                return res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Invalid login.' });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
        }
    },

    async logout(req, res) {
        return res.status(HttpStatus.OK).json({ ok: true });
    },

    async verifyJWTRoute(req, res, next) {
        const { token } = req.headers;

        jwtValidation(token)
            .then(() => {
                return res.status(HttpStatus.OK).json({ token });
            })
            .catch(error => {
                return res.status(HttpStatus.UNAUTHORIZED).json(error);
            });
    },

    async verifyJWTMiddleware(req, res, next) {
        const { token } = req.headers;

        jwtValidation(token)
            .then(() => {
                next();
            })
            .catch(error => {
                return res.status(HttpStatus.UNAUTHORIZED).json(error);
            });
    }
};

const jwtValidation = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                Logger.print(`Invalid token.`);
                reject({ msg: 'Invalid token', token, error });
            } else {
                Logger.print(`Token received for ID=${decoded.id}`);
                resolve();
            }
        });
    });
}