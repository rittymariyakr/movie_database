import express from 'express';
import MovieController from '../controllers/MovieController';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/userauth';

const router = express.Router();

router.get("/movie",authMiddleware, MovieController.getAllMovie);
router.get("/movie/:id",authMiddleware,  MovieController.getMovie);
router.post("/movie",authMiddleware, MovieController.createMovie);
router.put('/movie/:id',authMiddleware, MovieController.updateMovie);
router.delete('/movie/:id',authMiddleware, MovieController.deleteMovie);
router.post('/user', UserController.register);
router.post('/login', UserController.login);

export default router;
