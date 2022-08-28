import users from "../models/users.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

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
    res.status(StatusCodes.OK).json({user:{
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        location: user.location
    },token});
}

const login = async (req, res) => {
    res.send('Login user');
}

const updateUser = async (req, res) => {
    res.send('Update user');
}

export { register, login, updateUser };