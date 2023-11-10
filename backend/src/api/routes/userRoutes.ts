import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();


// POST  '/api/game' - Update wins, losses and games played.
router.post('/game', userController.updateStats);

router.get('/current_user', userController.getUser)

export default router;