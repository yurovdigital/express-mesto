const express = require('express')
const bodyParser = require('body-parser')
// База данных
const mongoose = require('mongoose')
// ПОРТ
const { PORT = 3000 } = process.env

// Роуты
const usersRoutes = require('./routes/users')
const cardRoutes = require('./routes/cards')
const { postUser, login } = require('./controllers/users')

// Middlewares
const auth = require('./middlewares/auth')
const error = require('./middlewares/error')

const app = express()

// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/mestodb')

// Роуты для логина и регистрации
app.post('/signin', login)
app.post('/signup', postUser)

// Авторизация
app.use(auth)

app.use('/', usersRoutes)
app.use('/', cardRoutes)

app.use(error)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`)
})
