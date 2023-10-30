import express from 'express';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkAuthStatus
 } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/authstatus', protect, checkAuthStatus);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/verify-email', verifyEmail); // Route for verifying email based on token
router.post('/reset-request', requestPasswordReset); // Route for password reset request
router.put('/reset-password', resetPassword); // Route for resetting password


export default router;