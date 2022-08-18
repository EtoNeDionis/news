const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const newsController = require('../controllers/newsController')
const categoryController = require('../controllers/categoryController')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const ratingController = require('../controllers/ratingController')

//user logic
router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 20}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

//category logic
router.get('/category', categoryController.getAll)
router.post('/category/add',
    roleMiddleware("admin"),
    body('body').isLength({min: 5, max: 15}),
    categoryController.createNewCategory
)


//test
router.post('/find_user', userController.getOne)

//news logic
router.get('/news',
    authMiddleware
    , newsController.getAll)
router.post('/news/add'
    ,roleMiddleware("admin")
    ,newsController.create)
router.get('/news/:id', newsController.getOne)

//rating
router.post(
    '/news/add_rating',
    authMiddleware,
    ratingController.addRate)
router.post(
    '/news/get_rating',
    ratingController.getRate
)


module.exports = router