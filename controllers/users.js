const User = require('../models/user')

// Получение списка пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' })
    })
}

// Получение ID пользователя
module.exports.getUserId = (req, res) => {
  User.fundById(req.params.userId)
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => {
      res.status(404).send({ message: 'Пользователь не найден' })
    })
}

// Создание пользователя
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => {
      res.status(400).send({
        message: 'Переданы некорректные данные при обновлении профиля',
      })
    })
}

// Обновление пользователя
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body
  User.create({ name, about })
    .then((user) =>
      res.status(200).send(req.user._id, { data: user }, { new: true })
    )
    .catch(() => {
      res.status(404).send({
        message: 'Пользователь не найден',
      })
    })
}

// Обновление аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body
  User.create({ avatar })
    .then((user) =>
      res.status(200).send(req.user._id, { data: user }, { new: true })
    )
    .catch(() => {
      res.status(404).send({
        message: 'Пользователь не найден',
      })
    })
}
