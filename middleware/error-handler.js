const { CustomAPIError } = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message})
    }
    // or you can provide: msg: `Something wend wrong, try again later`
    return res.status(500).json({ msg: 'Something went wrong, please try again'})
}

module.exports = errorHandlerMiddleware

