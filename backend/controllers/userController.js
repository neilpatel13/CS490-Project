import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import sendResetEmail from '../utils/sendResetEmail.js';

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    //To throw an error
    //
    //res.status(401);
    //throw new Error('Something went wrong');

    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password)) && user.isEmailVerified) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else if (user && !user.isEmailVerified) {
        res.status(401);
        throw new Error('Email not verified');
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const verificationToken = generateVerificationToken();

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        verificationToken
    });

    if(user) {
        sendVerificationEmail(user.email, verificationToken);
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
})

// @desc    Get user profile
// route    POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
})

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

// @desc    Get Auth user status
// route    GET /api/users/authstatus
// @access  Public
const checkAuthStatus = asyncHandler(async (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
});

// @desc Verify mail based on token
const verifyEmail = asyncHandler(async(req, res) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (user) {
            // Mark the user's email as verified and clear the verification token
            user.isEmailVerified = true;
            user.verificationToken = undefined;
            await user.save();

            res.status(200).json({ message: 'Email verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid verification token' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// @desc    Request password reset and send reset email
// route    POST /api/users/reset-request
// @access  Public
const requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const resetToken = generateToken(user._id);
        user.resetToken = resetToken;
        await user.save();

        // Send reset email with reset token
        sendResetEmail(user.email, resetToken);

        res.status(200).json({ message: 'Reset email sent successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Reset password with valid reset token
// route    PUT /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    const user = await User.findOne({ resetToken: token });

    if (user) {
        // Validate reset token and update password
        user.password = newPassword;
        user.resetToken = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } else {
        res.status(400);
        throw new Error('Invalid or expired reset token');
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkAuthStatus,
    verifyEmail,
    requestPasswordReset,
    resetPassword
};