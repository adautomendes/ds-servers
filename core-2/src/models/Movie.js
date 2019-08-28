const { Schema, model } = require('mongoose');

const MovieSchema = new Schema(
    {
        title: { type: String, required: true },
        duration: { type: Number, required: true },
        year: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model('Movie', MovieSchema);