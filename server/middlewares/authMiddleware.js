const ApiError = require('../errors/index')
const tokenService = require('../services/tokenService')

module.exports =  async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authHeader.split(" ")[1] // "Bearer *token*"
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}