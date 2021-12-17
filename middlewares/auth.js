// require('dotenv').config()
// const jwt = require('jsonwebtoken')
// const { NODE_ENV, JWT_SECRET } = process.env

// const UnauthorizedError = require('../errors/UnauthorizedError')

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new UnauthorizedError('Необходима авторизация.')
//   }

//   const token = authorization.replace('Bearer ', '')
//   let payload
//   try {
//     payload = jwt.verify(
//       token,
//       NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
//     )
//   } catch (err) {
//     throw new UnauthorizedError('Необходима авторизация.')
//   }

//   req.user = payload

//   next()
// }

const jwt = require('jsonwebtoken')

const UnauthorizedError = require('../errors/UnauthorizedError')

const { NODE_ENV, JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    next(new UnauthorizedError('Ошибка авторизации'))
  }

  let payload
  try {
    payload = jwt.verify(
      token,
      `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`
    )
  } catch (err) {
    next(new UnauthorizedError('Токен не прошел валидацию'))
  }

  req.user = payload

  next()
}
