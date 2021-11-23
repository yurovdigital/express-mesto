const Card = require('../models/card')

// Получение списка карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' })
    })
}

// Создание карточки
module.exports.postCard = (req, res) => {
  const { name, link } = req.body
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch(() => {
      res.status(400).send({ message: 'Ошибка при создании карточки' })
    })
}

// Удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId)
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch(() => {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена.' })
    })
}

// Установка лайка на карточку
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch(() => {
      res.status(400).send({
        message: 'Переданы некорректные данные для постановки/снятии лайка',
      })
    })
}

// Снятие лайка с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch(() => {
      res.status(404).send({
        message: 'Переданы некорректные данные для постановки/снятии лайка',
      })
    })
}
