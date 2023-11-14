import asyncHandler from 'express-async-handler';

const validateDate = asyncHandler(async (req, res, next) => {
    const { date } = req.body;
    if (!date || isNaN(Date.parse(date))) {
        res.status(400);
        throw new Error('Invalid date format');
    }
    next();
});

export { validateDate };
