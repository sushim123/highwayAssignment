import { Router } from 'express';
import { signup, verifyOtpAndSignup, signin, verifyOtpAndSignin, protectedRoute } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();


router.post('/signup', signup);
router.post('/signup/verify', verifyOtpAndSignup);
router.post('/signin', signin);
router.post('/signin/verify', verifyOtpAndSignin);
router.get('/protected', authenticateToken, protectedRoute);

export default router;