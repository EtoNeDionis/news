const {Category} = require('../models')
const {validationResult} = require("express-validator");

class CategoryController {
    async createNewCategory(req, res, next) {
        try {
            const {body} = req.body
            const errors = validationResult(req)  // 5 < body.length < 20
            if (!errors.isEmpty()) {
                return res.status(400).json('Категория должна содержать больше 5 знаков и меньше 20')
            }

            const category = await Category.create({body: body})
            return res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll()
            return res.json(categories)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()