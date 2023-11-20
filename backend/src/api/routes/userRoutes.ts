import express from 'express';
import * as userController from '../controllers/userController';
import * as uploadController from '../controllers/fileUploadController';


const router = express.Router();




router.get('/current_user', userController.getUser)

router.post('/upload/:userId', uploadController.uploadFile);

router.get('/leaderboard', userController.getLeaderboard)

router.post('/matchComplete', userController.matchResults)

export default router;