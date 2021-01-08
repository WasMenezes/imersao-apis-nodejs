//npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, heroesSchema))

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
  ])

  await app.start()
  console.log('Server running on port', app.info.port)

  return app
}

module.exports = main()