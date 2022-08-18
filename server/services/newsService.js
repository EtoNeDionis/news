const {News} = require("../models");

class newsService{
    async updateRating(id, rate){
        const news = await News.findByPk(id.newsId)
        const newRate = Number(rate.rate) + Number(news.rating)
        return news.update({rating: newRate})
    }
}

module.exports = new newsService()