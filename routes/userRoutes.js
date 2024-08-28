const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerUser, loginUser, updateUser, deleteUser } = require('../controller/userController');

//registration route
router.post('/register', registerUser);

//login route
router.post('/login', loginUser);

//update route
router.put('/:id', updateUser);

//delete user
router.delete('/:id', deleteUser);

module.exports = router;