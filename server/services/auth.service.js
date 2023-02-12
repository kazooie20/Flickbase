
//MIDDLEWARE
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

// MODEL
const { User } = require('../models/user');

// SERVICES
const userService = require('./user.service');

const createUser = async(email, password) => {
    try {
        //CHECK THE EMAIL DOES NOT EXIST
        if (await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email taken');
        }

        //ADD USER TO DB (HASH PASSWORD)
        const user = new User({
            email,
            password
        });

        await user.save();
        return user;
        
    } catch (error) {
        throw error;
        
    }
}

const generateAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

const signInWithEmailAndPassword = async(email, password) => {
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            // throw new Error('Sorry Bad Email');
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry Bad Email');
        }

        if (!(await user.comparePassword(password))) {
            // throw new Error('Sorry Bad Password');
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry Bad Password');
        }

        return user;
        
    } catch (error) {
        throw error;
        
    }
}

module.exports = {
    createUser,
    generateAuthToken,
    signInWithEmailAndPassword
}