const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models')
const cors = require('cors')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/errorMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.REACT_APP_CLIENT_URL,
}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(router)
app.use(errorMiddleware)


const PORT = process.env.PORT || 7000
const startDB = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startDB()
