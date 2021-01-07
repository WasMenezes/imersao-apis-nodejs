const assert = require('assert')
const api = require('../src/api')
const MOCK_HERO_REGISTER = {
  name: 'Chapolin',
  power: 'Bionic Hammer'
}

const MOCK_INITIAL_HERO= {
  name: 'Sasuke',
  power: 'Sharingan'
}

let MOCK_ID = ''

describe.only('Suite tests from API Heroes', function () {
  this.beforeAll(async () => {
    app = await api
    const result = await app.inject({
      method: 'POST',
      url: `/heroes`,
      payload: MOCK_INITIAL_HERO
    })
    const data = JSON.parse(result.payload)
    MOCK_ID = data._id;
  })

  it('list /heroes', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/heroes'
    })
    const data = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepStrictEqual(statusCode, 200)
    assert.ok(Array.isArray(data))
  })

  it('list /heroes - should return only 10 heroes', async () => {
    const LIMIT = 'Aeeee'
    const result = await app.inject({
      method: 'GET',
      url: `/heroes?skip=0&limit=${LIMIT}`
    })

    const errorResult = {
      "statusCode": 400,
      "error": 'Bad Request',
      "message": 'Invalid request query input'
    }

    assert.deepStrictEqual(result.payload, JSON.stringify(errorResult))
  })

  it('list /heroes - should filter one hero', async () => {
    const NAME = 'Spider Man - 1609925345665'
    const result = await app.inject({
      method: 'GET',
      url: `/heroes?skip=0&limit=1000&name=${NAME}`
    })
    const data = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepStrictEqual(statusCode, 200)
    assert.deepStrictEqual(data[0].name, NAME)
  })

  it('register POST -/heroes', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `/heroes`,
      payload: MOCK_HERO_REGISTER
    })

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)
    assert.ok(statusCode === 200)
    assert.deepStrictEqual(message, "Hero sucessfuly registered")
    assert.notDeepStrictEqual(_id, undefined)
  })

  it('register PATCH -/heroes/:id', async () => {
    const _id = MOCK_ID
    const expected = {
      power: 'Ninjutsu'
    }

    const result = await app.inject({
      method: 'PATCH',
      url: `/heroes/${_id}`,
      payload: expected
    })

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)
    assert.ok(statusCode === 200)
    assert.deepStrictEqual(data.message, "Hero sucessfuly updated")
  })

  it('register PATCH -/heroes/:id should not update with incorrect id', async () => {
    const _id = `5ff4eb1b9bcffde72a117840`
    const expected = {
      power: 'Ninjutsu'
    }

    const result = await app.inject({
      method: 'PATCH',
      url: `/heroes/${_id}`,
      payload: expected
    })

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)
    assert.ok(statusCode === 200)
    assert.deepStrictEqual(data.message, "Was not possible update")
  })
})