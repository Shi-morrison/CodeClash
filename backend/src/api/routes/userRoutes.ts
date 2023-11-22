import express from 'express';
import * as userController from '../controllers/userController';
import * as uploadController from '../controllers/fileUploadController';


const router = express.Router();




router.get('/current_user', userController.getUser)

router.get('/get_temporary_auth_token', userController.getTemporaryAuthToken)

router.post('/upload/:userId', uploadController.uploadFile);

router.get('/leaderboard', userController.getLeaderboard)

export default router;