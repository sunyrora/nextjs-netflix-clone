import { ERROR_USER_EXIST, LGOIN_ERROR_VALIDATION_ERROR, ERROR_INVALID_OPTION, LOGIN_ERROR_USER_NOT_EXIST, LOGIN_ERROR_INVALID_PASSWORD } from "../../utils/errorMessages";
import connectDB, { disconnectDB } from "../connectDB";
import User from "../models/User";

export const isUserExist = async (email) => {
    try {
        const user = await getUser({email});
        console.log('find user: ', user);

        return user ? true : false;

    } catch (error) {
        console.error('Error occured while finding user: ', error.message);
        throw error;
    }
};

export const isValidEmail = (email) => {
    if( !email ||
        !email.includes('@')
    ) {
        return false;
    }

    return true;
}

export const isValidPassword = (password) => {
    if( !password ||
        password.trim().length < 6
    ) {
        return false;
    }

    return true;
}

const checkValidation = (email, password) => {
    if(isValidEmail(email) && isValidPassword(password)) {
        return true;
    }

    const error = new Error(LGOIN_ERROR_VALIDATION_ERROR);
    error.statusCode = 422;
    throw error;
}

export const getAllUsers = async () => {
    try {
        await connectDB();
        const users = await User.find().lean();
        await disconnectDB();

        return users;

    } catch (error) {
        throw error;
    }
};

export const getUserById = async (_id) => {
    try {
        await connectDB();
        const user = await User.findOne({_id}).lean();
        await disconnectDB();

        return user;
    } catch (error) {
        throw error;
    }
}

export const getUser = async (option = {}, withPassword = false) => {
     try {

        if(!option || Object.keys(option).length <= 0) {
            const error = new Error(ERROR_INVALID_OPTION);
            error.statusCode = 422;

            throw error;
        }

        await connectDB();

        const user =  withPassword ? 
                await User.findOne(option).select('+password')
                : await User.findOne(option);
        
        await disconnectDB();

        console.log('find user: ', user);

        return user;

    } catch (error) {
        console.error('Error occured while finding user: ', error.message);
        throw error;
    }
}


export const registerUser = async (input) => {
    try {
        const { email, password, provider = 'credentials' } = input;
        // console.log('create user...', input);
        
        // if(!isValid(email, password)) {
        //     const error = new Error(LGOIN_ERROR_VALIDATION_ERROR);
        //     error.statusCode = 422;
        //     throw error;
        // }

        checkValidation(email, password);

        const userExist = await isUserExist(email);
        if(userExist) {
            const error = new Error(ERROR_USER_EXIST);
            error.statusCode = 409;
            throw error; 
        }
        
        await connectDB();

        const user = await User.create({
            ...input
        });

        await disconnectDB();

        return user;

    } catch (error) {
        // console.error('Error: registerUser: ', error);
        throw error;
    }
}

export const signIn = async (email, password, provider='credentials') => {
    try {

        const isCredentials = provider === 'credentials';
        if(isCredentials)
            checkValidation(email, password);
        
        const user = await getUser({email}, true);
        if(!user) {
            const error = new Error(LOGIN_ERROR_USER_NOT_EXIST);
            error.statusCode = 401;
            throw error; 
        }


        if(!isCredentials) return user;

        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            const error = new Error(LOGIN_ERROR_INVALID_PASSWORD);
            error.statusCode = 401;

            throw error;
        }

        return user;

    } catch (error) {
        throw error;
    }
};
