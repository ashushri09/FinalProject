require('dotenv').config()
const JWT = require('jsonwebtoken')
const createError = require('http-errors')

const JWT_SECRET = process.env.JWT_TOKEN_SECRET

module.exports = {
signAccessToken: (userId, userPhone) => {
return new Promise((resolve, reject) => {
const payload = { id: userId}
const secret = JWT_SECRET
const options = {
expiresIn: '1y',
issuer: 'ashu.com',
audience: userPhone,
}
JWT.sign(payload, secret, options, (err, token) => {
if (err) {
console.log(err.message)
reject(createError.InternalServerError())
return
}
resolve(token)
})
})
},
verifyAccessToken: (req, res, next) => {
if (!req.headers['authorization']) return next(createError.Unauthorized())
const authHeader = req.headers['authorization']
const bearerToken = authHeader.split(' ')
const token = bearerToken[1]
JWT.verify(token, JWT_SECRET, (err, payload) => {
if (err) {
const message =
err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
res.send(createError.Unauthorized(message))
return next(createError.Unauthorized(message))
}
req.payload = payload
next()
})
},
}
