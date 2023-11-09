import express from 'express';
import * as userController from '../controllers/saveUserController';
import * as oAuthController from '../controllers/oAuthController';
const router = express.Router();

// POST '/users/login' - Log in a user.
router.post('/login', userController.saveUser);

// GET '/users/github' - Save user to database.
router.get('/github', oAuthController.oAuth);

// POST  '/users/game' - Update wins, losses and games played.
router.post('/game', userController.updateStats);

export default router;