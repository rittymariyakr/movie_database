import express from 'express';
import MovieController from '../controllers/MovieController';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/userauth';

const router = express.Router();

router.get("/movie", MovieController.getAllMovie);
router.get("/movie/:id",  MovieController.getMovie);
router.post("/movie", MovieController.createMovie);
router.put('/movie/:id', MovieController.updateMovie);
router.delete('/movie/:id', MovieController.deleteMovie);
router.post('/user', UserController.register);
router.post('/login', authMiddleware, UserController.login);

export default router;
