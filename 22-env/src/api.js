const { config } = require('dotenv')
const { join } = require('path')
const { ok } = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env === 'prod' || env === 'dev', 'env is invalid, or dev or prod')

const configPath = join(__dirname, '../config', `.env.${env}`)
config({
  path: configPath
})

//npm i hapi

//npm i bcrypt
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const UserSchema = require('./../src/db/strategies/mongodb/schemas/userSchema')

const app = new Hapi.Server({
  port: process.env.PORT
})

console.log('port:', process.env.PORT)
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = process.env.JWT_KEY

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, heroesSchema))

  const connectionMongoDb = await MongoDb.connect()
  const contextMongoDb = new Context(new MongoDb(connectionMongoDb, UserSchema))

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
    validate: async (data, request) => {
      const result = await contextMongoDb.read({
        username: data.username.toLowerCase(),
        id: data.id
      })

      if (!result) {
        return { isValid: false }
      }

      return {
        isValid: true
      }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET, contextMongoDb), AuthRoute.methods())

  ])

  await app.start()
  console.log('Server running on port', app.info.port)

  return app
}

module.exports = main()