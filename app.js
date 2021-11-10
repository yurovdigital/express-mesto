// Настройки сервера
const express = require('express')
const { PORT = 3000 } = process.env

// База данных
const mongoose = require('mongoose')



const app = express()

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на порту: ${PORT}`)
})
