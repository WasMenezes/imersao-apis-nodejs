//npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')

const app = new Hapi.Server({
  port: 5000
})

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, heroesSchema))

  app.route([
    {
      path: '/heroes',
      method: 'GET',
      handler: (request, head) => {
        return context.read()
      }
    }
  ])

  await app.start()
  console.log('Server running on port', app.info.port)
}

main()