import asyncHandler from 'express-async-handler'

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    //To throw an error
    //
    //res.status(401);
    //throw new Error('Something went wrong');

    res.status(200).json({ message: 'Auth user' });
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Register user' });
})

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Logout user' });
})

// @desc    Get user profile
// route    POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'User profile' });
})

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Update user profile' });
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};