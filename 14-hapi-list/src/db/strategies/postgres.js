const ICrud = require("./interfaces/ICrud")

class Postgres extends ICrud {
  constructor() {
    super()
  }
  
  isConnenected(){
    
  }
  
  create(item) {
    console.log('O item foi salvo em postgres')
  }
}

module.exports = Postgres