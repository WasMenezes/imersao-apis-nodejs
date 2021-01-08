const BaseRoute = require('./base/baseRoute')
const Joi = require('joi');
const Boom = require('boom')
const failAction = (request, headers, erro) => {
  throw erro;
}

// npm i jsonwebtoken
// npm i hapi-auth-jwt2
const Jwt = require('jsonwebtoken')

const USER = {
  name: 'xuxadasilva',
  password: '123'
}

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super()
    this.secret = secret
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Get Token',
        notes: 'Log in with username and password',
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        }
      },
      handler: async (request) => {
        const { username, password } = request.payload

        if (username.toLowerCase() != USER.name ||
          password !== USER.password)
          return Boom.unauthorized()


        const token = Jwt.sign({
          username: username,
          id: 1
        }, this.secret)

        return { token }

      }
    }
  }
}

module.exports = AuthRoutes