const assert = require('assert')
const { getPeople } = require('./service')

describe('Star Wars Tests', function () {
  it('ensure return r2d2 with correct format', async() => {
    const expected = [{ name: 'R2-D2', height: '96'}]
    const baseName = `r2-d2`
    const result = await getPeople(baseName)
    assert.deepStrictEqual(result, expected)
  })
})