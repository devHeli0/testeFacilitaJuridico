import { ErrorRequestHandler } from 'express'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(err.statusCode).json(err.data)
}

export default errorHandlerMiddleware
