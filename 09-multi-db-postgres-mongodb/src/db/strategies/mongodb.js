const ICrud = require("./interfaces/ICrud")
const Mongoose = require('mongoose')
const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
}
class MongoDb extends ICrud {
  constructor() {
    super()
    this._heroes = null
    this._driver = null
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState]
    if (state === 'Connected') return state

    if (state !== 'Connecting') return state;

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return STATUS[this._driver.readyState]
  }

  defineModel() {
    this._heroes = Mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      power: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    })
  }

  connect() {
    Mongoose.connect("mongodb://localhost:27017/heroes", { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = Mongoose.connection
    this._driver = connection
    connection.once('open', () => console.log('database running!!'))
  }

  async create(item) {
    const resultRegister = await model.create({
      name: 'Batman',
      power: 'Money'
    })
  }
}

module.exports = MongoDb