import users from "../models/users.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js"

const register = async (req, res) => {
    const { name, password, email } = req.body;

    if(!name || !password || !email)
    {
        throw new BadRequestError('Please provide all values');
    }

    const userAlreadyExists = await users.findOne({email});
    if(userAlreadyExists)
    {
        throw new BadRequestError('Email already in use');
    }

    const user = await users.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user:{
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location
        },
        token,
        location: user.location,
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw new BadRequestError('Please provide all values');
    }

    const user = await users.findOne({email}).select('+password');
    if(!user) {
        throw new UnauthenticatedError('User with this email not found!');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
    res.send('Update user');
}

export { register, login, updateUser };