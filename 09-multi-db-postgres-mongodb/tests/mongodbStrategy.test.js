const assert = require('assert')
const MongoDb = require('../src/db/strategies/mongodb')
const Context = require('../src/db/strategies/base/contextStrategy')

const context = new Context(new MongoDb())

describe('MongoDB Suite Tests', function () {
  this.beforeAll(async () => {
    await context.connect()
  })

  it('verify conection', async () => {
    const result = await context.isConnected()
    const expected = 'Connected'
    assert.deepStrictEqual(result, expected)
  })
})