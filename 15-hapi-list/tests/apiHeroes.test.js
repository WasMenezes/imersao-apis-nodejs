const assert = require('assert')
const api = require('../src/api')

describe.only('Suite tests from API Heroes', function () {
  this.beforeAll(async () => {
    app = await api
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
})