const ICrud = require("../interfaces/ICrud")
const Mongoose = require('mongoose')
const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
}
class MongoDb extends ICrud {
  constructor(connection, schema) {
    super()
    this._schema = schema
    this.connection = connection
  }

  async isConnected() {
    const state = STATUS[this.connection.readyState]
    if (state === 'Connected') return state

    if (state !== 'Connecting') return state;

    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS[this.connection.readyState]
  }


  static connect() {
    Mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = Mongoose.connection
    connection.once('open', () => console.log('database running!!'))

    return connection
  }

  create(item) {
    return this._schema.create(item)
  }

  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit)
  }

  update(id, item, upsert = false) {
    return this._schema.findOneAndUpdate({ _id: id }, { $set: item }, {new: true, useFindAndModify: false, upsert: upsert})
  }

  delete(id) {
    return this._schema.deleteOne({_id: id})
  }
}

module.exports = MongoDb