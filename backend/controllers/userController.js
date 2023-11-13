import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'

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
    });

    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            first: user.first,
            last: user.last,
            email: user.email,
            pomodoro: user.pomodoro,
            short: user.pomodoro,
            long: user.long,
        });
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
})

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
})

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


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkPassword
};