const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if the password hasn't been modified
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to validate password
userSchema.methods.isValidPassword = async function(password) {
    try {
        console.log('Comparing password:', password, 'with hash:', this.password);
        return await bcrypt.compare(password, this.password); // Compare with hashed password
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;