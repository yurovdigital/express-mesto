const Card = require('../models/card')

// Получение списка карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера.' })
    })
}

// Создание карточки
module.exports.postCard = (req, res) => {
  const { name, link } = req.body
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' })
      }
    })
}

// Удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' })
      } else if (err.message === 'NotValidId') {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена.' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' })
      }
    })
}

// Установка лайка на карточку
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' })
      } else if (err.message === 'NotValidId') {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена.' })
      }
      res.status(500).send({ message: 'Ошибка сервера.' })
    })
}

// Снятие лайка с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.statud(400).send({ message: 'Переданы некорректные данные.' })
      } else if (err.message === 'NotValidId') {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена.' })
      }
      res.status(500).send({ message: 'Ошибка сервера.' })
    })
}
