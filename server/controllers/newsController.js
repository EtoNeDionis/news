const uuid = require('uuid')
const path = require('path')    //для разных ОС
const {News} = require('../models')
const ApiError = require("../errors");

class NewsController {
    async create(req, res, next) {
        try {
            const {categoryId, title, content, info} = req.body
            const {img} = req.files
            const fileName = uuid.v4() + ".png"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const news = await News.create({title, categoryId, image: fileName, content, info})

            return res.json(news)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {category} = req.query // .../news?category=1
            if (category) {
                const news = await News.findAll({where: {categoryId: category}})
                return res.json(news)
            }
            //
            if (!category) {
                const news = await News.findAll()
                return res.json(news)
            }
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const news = await News.findOne({where: {id}})
            if(!news){
                throw ApiError.BadRequest('Страница не существует')
            }
            return res.json(news)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new NewsController()