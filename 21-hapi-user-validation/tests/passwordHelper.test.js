const { AssertionError } = require('assert')
const assert = require('assert')
const PasswordHelper = require('../src/helpers/passwordHelper')

const PASSWORD = 'was@123456'
const HASH = '$2b$04$9OHjUsZFhlKcLgGdTrgzA.o257lJZZWqbnzOnWy30PvPUHdGvArta'

describe('UserHelper test suite', function (){
  it('should generate a hash from a password', async() => {
    const result = await PasswordHelper.hashPassword(PASSWORD)
    assert.ok(result.length > 10)
  })

  it('should compare a password with your hash', async () => {
    const result = await PasswordHelper.comparePassword(PASSWORD, HASH)
    assert.ok(result)
  })
})