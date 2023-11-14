import express from 'express';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkPassword,
    forgotPassword, // new import
    resetPassword, //new import
    verifyEmail, // new import
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/check-password', checkPassword);
router.post('/forgot-password', forgotPassword); // new route
router.post('/reset-password/:token', resetPassword); // new route
router.get('/verify-email/:token', verifyEmail); // new route

export default router;
