import express from 'express';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkPassword,
    resetPassword,
    confirmToken,
    resetPasswordConfirmation,
    uploadImage
 } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


console.log("here1")
router.post('/uploadImage/:email', uploadImage);
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/check-password', checkPassword);
router.get('/confirmation/:userId/:token', confirmToken);
router.post('/resetPassword', resetPassword);
router.post('/resetPassword/:userId/:token', resetPasswordConfirmation);

export default router;