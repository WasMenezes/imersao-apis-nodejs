const { deepStrictEqual } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_REGISTER = {
  name: 'Flash',
  power: 'Speed',
  id: 1
}

const DEFAULT_ITEM_UPDATE = {
  name: 'Green lantern',
  power: 'Ring Energy',
  id: 2
}

describe('Suite heroes manipulation', () => {
  before(async () => {
    await database.registerHeroes(DEFAULT_ITEM_REGISTER);
    await database.registerHeroes(DEFAULT_ITEM_UPDATE);

  })

  it('Should search a hero using a file', async () => {
    const expected = DEFAULT_ITEM_REGISTER
    const [result] = await database.listHeroes(expected.id)
    //[result] >> Destructor
    deepStrictEqual(result, expected)
  })

  it('Should create a hero using files', async () => {
    const expected = {
      ...DEFAULT_ITEM_REGISTER,
      id: 2,
      name: 'Batman'
    }
    await database.registerHeroes(expected)
    const [actual] = await database.listHeroes(expected.id)
    deepStrictEqual(actual, expected)
  })

  it('Should delete a hero by id', async () => {
    const expected = true
    const result = await database.remove(DEFAULT_ITEM_REGISTER.id)
    deepStrictEqual(result, expected)
  })

  it('Should update a hero by id', async () => {
    const expected = {
      ...DEFAULT_ITEM_UPDATE,
      name: 'Batman',
      power: 'Money', 
    }

    const newData = {      name: 'Batman',
      power: 'Money',
    }
    await database.update(DEFAULT_ITEM_UPDATE.id, newData)
    const [result] = await database.listHeroes(DEFAULT_ITEM_UPDATE.id)
    deepStrictEqual(result, expected)
  })
})