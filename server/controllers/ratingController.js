const {Rating} = require("../models");
const newsService = require('../services/newsService')

class RatingController {
    async addRate(req, res, next) {
        try {
            const {newsId, userId, rate} = req.body //rate: -1 | +1
            const rateData = await Rating.findOne({where: {newsId, userId}})
            if (rateData) {
                return res.json(rateData)
            }
            const newRate = await Rating.create({rate, userId, newsId})
            await newsService.updateRating({newsId}, {rate})
            return res.json(newRate)
        } catch (e) {
            next(e)
        }
    }

    async getRate(req, res, next) {
        try{
            const {userId} = req.body
            const rateData = await Rating.findAll({where: {userId}})
            return res.json(rateData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RatingController()