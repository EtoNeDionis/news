const jwt = require('jsonwebtoken')
const {Token} = require('../models')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await Token.create({refreshToken, userId})
    }

    async removeToken(refreshToken) {
        return await Token.destroy({where: {refreshToken}})
    }

    async validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return
        }
    }

    async validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return
        }
    }

    async checkRefreshToken(refreshToken){
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
    }
}

module.exports = new TokenService()