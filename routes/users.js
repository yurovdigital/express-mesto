const router = require('express').Router()

const {
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users')

router.get('/users', getUsers)

router.get('/users/:userId', getUserId)

router.patch('/users/me', updateUser)

router.patch('/users/me/avatar', updateUserAvatar)

module.exports = router
