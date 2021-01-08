//npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const app = new Hapi.Server({
  port: 5000
})

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MY_SECRET_123'

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, heroesSchema))

  const swaggerOptions = {
    info: {
      title: 'API Heroes - #CursoNodeBR',
      version: 'v1.0'
    }
  }

  await app.register([
    HapiJwt,
    Vision, 
    Inert, 
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn:
    // }
    validate: (data, request) => {
      return {
        isValid: true
      }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())

  ])

  await app.start()
  console.log('Server running on port', app.info.port)

  return app
}

module.exports = main()