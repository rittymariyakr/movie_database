import express from "express";
import { MovieModel } from "../db/movie";
import { Document } from "mongoose";

interface MovieDocument extends Document {
    movieTitle: string;
    director: string;
    releaseDate: Date;
    rating: number;
}

class MovieController {
    getAllMovie = async (request: express.Request, response: express.Response) => {
        try {
            const movies = await MovieModel.find();
            return response.status(200).json({ data: movies });

        } catch (error) {
            console.error("Error while fetching movies:", error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    getMovie = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const movie = await MovieModel.findById(id);
            if (!movie) {
                return response.status(404).json({ message: "Movie not found" });
            }
            return response.status(200).json({ data: movie });

        } catch (error) {
            console.error("Error while fetching movie:", error);
            return response.status(400).json({ message: "Internal server error" });
        }
    }

    createMovie = async (request: express.Request, response: express.Response) => {
        try {
            const { movieTitle, director, releaseDate, rating } = request.body;
            const movie = new MovieModel({
                movieTitle,
                director,
                releaseDate,
                rating
            });
            await movie.save();
            return response.status(201).json({ message: "Movie added", data: movie });

        } catch (error) {
            console.error("Error while creating movie:", error);
            return response.status(400).json({ message: "Internal server error" });
        }
    }

    updateMovie = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const { movieTitle, director, releaseDate, rating } = request.body;

            const movie = await MovieModel.findById(id) as MovieDocument;
            if (!movie) {
                return response.status(404).json({ message: "Movie not found" });
            }

            movie.movieTitle = movieTitle;
            movie.director = director;
            movie.releaseDate = releaseDate;
            movie.rating = rating;

            await movie.save();
            return response.status(200).json({ message: "Movie updated", data: movie });

        } catch (error) {
            console.error("Error while updating movie:", error);
            return response.status(400).json({ message: "Internal server error" });
        }
    }

    deleteMovie = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const movie = await MovieModel.findByIdAndDelete({_id: id}); 
            if (!movie) {
                return response.status(404).json({ message: "Movie not found" });
            }
            return response.status(200).json({ message: "Movie deleted", data: movie });

        } catch (error) {
            console.error("Error while deleting movie:", error);
            return response.status(400).json({ message: "Internal server error" });
        }
    }
}

export default new MovieController();
