module.exports = class ApiError extends Error{
    status
    errors

    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static UnauthorizedError(){
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, error = []){
        return new ApiError(400, message, error)
    }

    static ForbiddenError(){
        return new ApiError(403, 'Не достаточно прав')
    }
}
