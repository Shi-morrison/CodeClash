import express from 'express';
import * as userController from '../controllers/userController';
import * as oAuthController from '../controllers/oAuthController';
const router = express.Router();

// POST '/users/login' - Log in a user
router.post('/login', userController.login);
router.get('/github', oAuthController.oAuth);

export default router;