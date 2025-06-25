import { Router } from 'express';
import { register, login, refreshToken } from '../controllers/auth.controller';

const router = Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Refresh token
router.post('/refresh-token', refreshToken);

export default router;
