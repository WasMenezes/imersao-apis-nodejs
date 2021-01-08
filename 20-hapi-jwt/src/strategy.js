class NotImplementadException extends Error {
  constructor() {
    super('Not Implemented Exception')
  }
}

class ICrud {
  create(item) {
    throw new NotImplementadException()
  }

  read(query) {
    throw new NotImplementadException()
  }

  update(id, item) {
    throw new NotImplementadException()
  }

  delete(id) {
    throw new NotImplementadException()
  }
}

class MongoDB extends ICrud {
  constructor() {
    super()
  }

  create(item) {
    console.log('O item foi salvo em MongoDB')
  }
}

class Postgres extends ICrud {
  constructor() {
    super()
  }

  create(item) {
    console.log('O item foi salvo em postgres')
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy
  }

  create(item) {
    return this._database.create(item)
  }

  read(query) {
    return this._database.read(query)
  }

  update(id, item) {
    return this._database.update(id, item)
  }

  delete(id) {
    return this._database.delete(id)
  }

}

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()