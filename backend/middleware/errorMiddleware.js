import asyncHandler from 'express-async-handler'

const notFound = async(req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = async(err, req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    console.log(err)
    return res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }