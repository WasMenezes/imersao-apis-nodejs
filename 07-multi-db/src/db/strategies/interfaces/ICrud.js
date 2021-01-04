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

  isConnected() {
    
  }
}

module.exports = ICrud