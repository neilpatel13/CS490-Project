import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import crypto from 'crypto'; // new import
import sendEmail from '../utils/sendEmail.js'; // new import

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

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            first: user.first,
            last: user.last,
            email: user.email,
            pomodoro: user.pomodoro,
            short: user.short,
            long: user.long
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        email,
        password,
        verificationToken: crypto.randomBytes(20).toString('hex'),
    });

    if(user) {
        const verifyUrl = `http://localhost:3000/verify-email/${user.verificationToken}`;
        const message = `Hi,\n\nPlease click on the following link to verify your email: \n\n${verifyUrl}\n\nIf you did not request this, please ignore this email.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Email Verification',
                message,
            });

            generateToken(res, user._id);
            res.status(201).json({
            _id: user._id,
            first: user.first,
            last: user.last,
            email: user.email,
            pomodoro: user.pomodoro,
            short: user.pomodoro,
            long: user.long,
            message: 'Verification email sent. Please check your email to verify your account.',
            });
        } catch (error) {
            user.verificationToken = undefined; // Remove the token if email sending fails
            await user.save();
            res.status(500);
            throw new Error('Email could not be sent');
        }
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// route    POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = {
        _id: req.user._id,
        first: req.user.first,
        last: req.user.last,
        email: req.user.email,
        pomodoro: req.user.pomodoro,
        short: req.user.short,
        long: req.user.long,
    }
    res.status(200).json(user);
});

// @desc    C
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.first = req.body.first || user.first;
        user.last = req.body.last || user.last;
        user.email = req.body.email || user.email;
        user.pomodoro = req.body.pomodoro || user.pomodoro;
        user.short = req.body.short || user.short;
        user.long = req.body.long || user.long;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            first: updatedUser.first,
            last: updatedUser.last,
            email: updatedUser.email,
            pomodoro: updatedUser.pomodoro,
            short: updatedUser.short,
            long: updatedUser.long,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const checkPassword = asyncHandler(async(req, res) => {
    const { _id ,currentPassword } = req.body;

    const user = await User.findOneById({_id});

    if(user && (await user.matchPassword(currentPassword))) {
        res.status(200).json({ message: 'Current password is correct' });
    } else {
        res.status(401);
        throw new Error('Current password is incorrect');
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Token',
            message,
        });

        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(500).json({ message: 'Email could not be sent' });
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Password reset token is invalid or has expired');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });
  
    if (!user) {
      res.status(400);
      throw new Error('Invalid or expired email verification token');
    }
  
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
  
    res.status(200).json({ message: 'Email verified successfully' });
  });

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkPassword,
    forgotPassword,
    resetPassword,
    verifyEmail
};