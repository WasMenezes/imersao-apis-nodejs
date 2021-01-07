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

})