const express = require('express')
const bodyParser = require('body-parser')
// База данных
const mongoose = require('mongoose')
// ПОРТ
const { PORT = 3000 } = process.env

// Роуты
const usersRoutes = require('./routes/users')
const cardRoutes = require('./routes/cards')

const app = express()

// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '618d36348e4e91b03233ccf3', // вставьте сюда _id созданного в предыдущем пункте пользователя
  }

  next()
})

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use('/', usersRoutes)
app.use('/', cardRoutes)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`)
})
