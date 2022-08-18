const {validationResult} = require("express-validator");
const userService = require('../services/userService')
const {User} = require("../models");

class UserController {
    async registration(req, res, next) {
        try {
            const err = validationResult(req)
            if (!err.isEmpty()) {
                return res.json(401, `Произошла ошибка, почта или пароль не соблюдают требования`)
            }

            const {email, password} = req.body
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 3600 * 1000,
                secure: true
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 3600 * 1000,
                secure: false
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 3600 * 1000,
                secure: false
            })   //secure-true
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    //delete after
    async getOne(req, res, next) {
        try {
            const {email} = req.body
            const user = await User.findOne({where: {email}})
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()