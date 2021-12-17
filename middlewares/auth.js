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

require('dotenv').config()
const jwt = require('jsonwebtoken')

// 401
const UnauthorizedError = require('../errors/UnauthorizedError')

const { NODE_ENV, JWT_SECRET } = process.env

const auth = (req, res, next) => {
  if (!req.cookies.jwt) throw new UnauthorizedError('Необходима авторизация')

  const token = req.cookies.jwt
  let payload

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    )
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  req.user = payload

  next()
}

module.exports = auth
