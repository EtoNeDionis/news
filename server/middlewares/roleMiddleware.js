const ApiError = require("../errors");
const tokenService = require("../services/tokenService");
module.exports = (role) => {
    return async (req, res, next) => {
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

            if(userData.role !== role){
                return next(ApiError.ForbiddenError())
            }

            next()
        } catch (e) {
            return next(ApiError.UnauthorizedError())
        }
    }
}