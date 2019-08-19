const HttpStatus = require('http-status-codes');

const Movie = require('../models/Movie');
const Logger = require('../logger')('[MOVIE]');

module.exports = {
    async insert(req, res) {
        const { title, duration, year } = req.body;

        //Testing if movie already exists
        const movieExists = await Movie.findOne({ title });

        if (movieExists) {
            Logger.print(`'${title}' already exists.`);
            return res.status(HttpStatus.OK).json(movieExists);
        }

        const movie = await Movie.create({
            title,
            duration,
            year
        });

        Logger.print(`'${title}' created!`);
        return res.status(HttpStatus.CREATED).json(movie);
    },

    async update(req, res) {
        const { id, title, duration, year } = req.body;

        const response = await Movie.updateOne({ _id: id }, {
            title,
            duration,
            year
        });

        if(response.nModified == 1 && response.ok == 1) {
            Logger.print(`'${title}' updated!`);
            const movie = await Movie.findById(id);
            return res.status(HttpStatus.OK).json(movie);
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Invalid request' });
    },

    async search(req, res) {
        const { id } = req.params;
        let movies;

        if(id) { //Find one
            movies = await Movie.findById(id);
            Logger.print(`Movie '${movies.title}' found!`);
        } else { //Find all
            movies = await Movie.find();
            Logger.print(`${movies.length} movies found!`);
        }

        return res.status(HttpStatus.OK).json(movies);
    },

    async delete(req, res) {
        const { id } = req.body;

        const response = await Movie.deleteOne({ _id: id });

        if(response.deletedCount == 1 && response.ok == 1) {
            Logger.print(`${id} removed!`);
            return res.status(HttpStatus.NO_CONTENT).json();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Invalid request' });
    }
};