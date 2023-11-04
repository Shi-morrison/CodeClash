import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

// POST '/users/login' - Log in a user
router.post('/login', userController.login);

export default router;