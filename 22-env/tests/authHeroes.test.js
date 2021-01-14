const assert = require('assert')
const api = require('../src/api')
const Context = require('./../src/db/strategies/base/contextStrategy')
const MongoDb = require('./../src/db/strategies/mongodb/mongodb')
const UserSchema = require('./../src/db/strategies/mongodb/schemas/userSchema')
let app = {}


const USER = {
  username: 'Xuxadasilva',
  password: '123'
}

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$mbbJolazIHeFul5PqPgrnuH9/skRnx4NshI88c7KV187.RCFZNYvO'
}

describe('Auth test suite', function() {
  this.beforeAll(async () => {
    app = await api

    const connectionMongoDb = await MongoDb.connect()
    context = new Context(new MongoDb(connectionMongoDb, UserSchema))
    const result = await context.update(null, USER_DB, true)
  })

  it('should get a token', async() => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER
    })
    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)

    assert.deepStrictEqual(statusCode, 200)
    assert.ok(data.token.length > 10)
  })

  it('should return unauthorized when login fails', async() => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'failtest',
        password: '123'
      }
    })
    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)

    assert.deepStrictEqual(statusCode, 401)
    assert.ok(data.error, 'Unauthorized')

  })
})