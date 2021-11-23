const User = require('../models/user')

// Получение списка пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера.' })
    })
}

// Получение ID пользователя
module.exports.getUserId = (req, res) => {
  User.fundById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' })
      } else if (err.message === 'NotValidId') {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' })
      }
    })
}

// Создание пользователя
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' })
      }
    })
}

// Обновление пользователя
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body
  User.create({ name, about })
    .orFail(new Error('NotValidId'))
    .then((user) =>
      res
        .status(200)
        .send(
          req.user._id,
          { data: user },
          { new: true },
          { runValidators: true }
        )
    )
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' })
      } else if (err.message === 'NotValidId') {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' })
      }
    })
}

// Обновление аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body
  User.create({ avatar })
    .orFail(new Error('NotValidId'))
    .then((user) =>
      res
        .status(200)
        .send(
          req.user._id,
          { data: user },
          { new: true },
          { runValidators: true }
        )
    )
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' })
      } else if (err.message === 'NotValidId') {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' })
      }
    })
}
