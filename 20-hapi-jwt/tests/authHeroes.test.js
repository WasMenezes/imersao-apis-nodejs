const assert = require('assert')
const api = require('../src/api')

let app = {}



describe('Auth test suite', function() {
  this.beforeAll(async () => {
    app = await api
  })

  it('should get a token', async() => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'Xuxadasilva',
        password: '123'
      }
    })

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)

    assert.deepStrictEqual(statusCode, 200)
    assert.ok(data.token.length > 10)
  })
})