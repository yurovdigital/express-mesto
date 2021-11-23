const router = require('express').Router()

const {
  getUsers,
  postUser,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users')

router.get('/users', getUsers)

router.get('/users/:userId', getUserId)

router.post('/users', postUser)

router.post('/users/me', updateUser)

router.post('/users/me/avatar', updateUserAvatar)

module.exports = router
