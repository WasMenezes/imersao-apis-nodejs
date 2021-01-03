const {
  deepStrictEqual
} = require('assert')

const database = require('./database'
)
const DEFAULT_ITEM_REGISTER = {
  name: 'Flash',
  power: 'Speed',
  id: 1
}


describe('Suite heroes manipulation', () => {
  it('Should search a hero using a file', async () => {
    const expected = DEFAULT_ITEM_REGISTER
    const [result] = await database.listHeroes(expected.id)
    //[result] >> Destructor
    deepStrictEqual(result, expected)
  })
  // it ('Should create a hero using files', async () => {
  //   const expected = DEFAULT_ITEM_REGISTER

  //   ok(null, expected)
  // })
})