import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();


// POST  '/users/game' - Update wins, losses and games played.
router.post('/game', userController.updateStats);

export default router;