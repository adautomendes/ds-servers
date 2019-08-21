const express = require('express');
const appRouter = express.Router();

const AuthController = require('./src/controllers/AuthController');
const UserController = require('./src/controllers/UserController');
const MovieController = require('./src/controllers/MovieController');

const authRouter = express.Router();
const userRouter = express.Router();
const movieRouter = express.Router();

appRouter.get('/', (req, res) => { //Root route of app
    res.json({ ok: true })
});

appRouter.use('/auth', authRouter);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);

appRouter.use('/user', AuthController.tokenExists, userRouter);
userRouter.post('/', UserController.insert);
userRouter.patch('/', UserController.update);
userRouter.get('/:id?', UserController.search);
userRouter.delete('/', UserController.delete);

appRouter.use('/movie', AuthController.tokenExists, movieRouter);
movieRouter.post('/', MovieController.insert);
movieRouter.patch('/', MovieController.update);
movieRouter.get('/:id?', MovieController.search);
movieRouter.delete('/', MovieController.delete);

module.exports = appRouter;