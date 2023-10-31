import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Check length
                if (v.length < 12) {
                    return false;
                }

                // Check complexity
                let checksPassed = 0;
                if (/[A-Z]/.test(v)) checksPassed++; // Uppercase letter
                if (/[a-z]/.test(v)) checksPassed++; // Lowercase letter
                if (/\d/.test(v)) checksPassed++; // Numeric digit
                if (/\W/.test(v)) checksPassed++; // Special character

                return checksPassed >= 2;
            },
            message: 'Password does not meet complexity requirements',
        },

    },
},
{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function  (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;