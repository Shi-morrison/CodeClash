import express from 'express';
import * as userController from '../controllers/userController';
import * as uploadController from '../controllers/fileUploadController';


const router = express.Router();


// POST  '/api/game' - Update wins, losses and games played.
router.post('/game', userController.updateStats);

router.get('/current_user', userController.getUser)

router.post('/upload/:userId', uploadController.uploadFile);

router.get('/leaderboard', userController.getLeaderboard)

export default router;