import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: true,
        unique: true
    },
    director: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating:{
        type: String,
        required: true
    }

});

export const MovieModel = mongoose.model('Movie', MovieSchema );