import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);

    const defaultError = {
        statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, please try again latter',
    }
    if(err.name === 'ValidationError')
    {
        defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
        defaultError.message = Object.values(err.errors).map((item) => item.message).join(', ');
    }
    if(err.code && err.code === 11000)
    {
        defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
        defaultError.message = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    //res.status(defaultError.statusCode).json({message: err});
    res.status(defaultError.statusCode).json({message: defaultError.message});
}

export default errorHandlerMiddleware;