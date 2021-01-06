const assert = require('assert')
const MongoDb = require('../src/db/strategies/mongodb')
const Context = require('../src/db/strategies/base/contextStrategy')

const MOCK_HERO_REGISTER = {
  name: 'Wonderful Woman',
  power: 'Tie'
}

const MOCK_HERO_DEFAULT = {
  name: `Spider Man - ${Date.now()}`,
  power: 'Cobweb'
}

const MOCK_HERO_UPDATE = {
  name: `Naruto - ${Date.now()}`,
  power: 'Kyub'
}

let MOCK_HERO_ID = ''

const context = new Context(new MongoDb())

describe('MongoDB Suite Tests', function () {
  this.beforeAll(async () => {
    await context.connect()
    await context.create(MOCK_HERO_DEFAULT)
    const result  = await context.create(MOCK_HERO_UPDATE)
    MOCK_HERO_ID = result._id
  })

  it('verify conection', async () => {
    const result = await context.isConnected()
    const expected = 'Connected'
    assert.deepStrictEqual(result, expected)
  })

  it('register', async () => {
    const { name, power } = await context.create(MOCK_HERO_REGISTER)
    assert.deepStrictEqual({ name, power }, MOCK_HERO_REGISTER)
  })

  it('list', async () => {
    const [{ name, power }] = await context.read({ name: MOCK_HERO_DEFAULT.name })

    const result = {
      name, power
    }
    assert.deepStrictEqual(result, MOCK_HERO_DEFAULT)
  })

  it('update', async () => {
    const result = await context.update(MOCK_HERO_ID, {
      name: 'Fred'
    })

    assert.deepStrictEqual(result.nModified, 1)
  })
})