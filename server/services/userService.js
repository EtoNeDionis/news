const ApiError = require("../errors");
const {User} = require("../models");
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')

class UserService{
    async registration(email, password){
        const person = await User.findOne({where: {email}})
        if(person){
            throw ApiError.BadRequest(`Пользователь с ${email} уже существует`)
        }
        const hashedPassword = await bcrypt.hash(password, 3)
        const user = await User.create({email, password: hashedPassword, role: 'user'})
        const userDto = {
            id: user.id,
            email: email,
            role: 'user'
        }
        const tokens = tokenService.generateTokens(userDto)
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password){
        const user = await User.findOne({where: {email}})
        if(!user){
            throw ApiError.BadRequest(`Пользователь с ${email} не существует`)
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if(!isPasswordEquals){
            throw ApiError.BadRequest(`Неправильный пароль`)
        }

        const userDto = {
            id: user.id,
            email: email,
            role: user.role
        }
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken){
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.checkRefreshToken(refreshToken)
        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }
        const {id} = userData
        const user = await User.findByPk(id)
        const userDto = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto}
    }
}

module.exports = new UserService()