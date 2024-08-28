const User = require('../models/User');
const bcrypt = require('bcryptjs');

//register user controller
const registerUser = async(req,res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const registeredEmail = await User.findOne({ email });

        if(registeredEmail) {
            return res.status(401).json({ message: 'Email already exists' });
        }

        const newUser = new User({
            first_name,
            last_name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: `User ${first_name} ${last_name} created`});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

};

//login user controller
const loginUser = async(req,res) => {

    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
 
    if (!user) {
        return res.status(401).json({ message: 'No user found' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(201).json({ message: 'User login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update user controller
const updateUser = async(req,res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(first_name) user.first_name = first_name;
        if(last_name) user.last_name = last_name;
        if(email) user.email = email;
        if(password) user.password = password;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

//delete user controller
const deleteUser = async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const { first_name, last_name } = user;
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `User ${first_name} ${last_name} deleted`});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};