const {
  readFile
} = require('fs')

const {promisify} = require('util')

const readFileAsync = promisify(readFile)

class Database {
  constructor() {
    this.FILE_NAME = 'heroes.json'
  }

  async getFileData(){
    const file = await readFileAsync(this.FILE_NAME, 'utf8')
    return JSON.parse(file.toString())
  }

  writeFile(){

  }

  async listHeroes(id){
    const data = await this.getFileData()
    const filteredData = data.filter(item => (id ? (item.id === id) : true))
    return filteredData
  }
}

module.exports = new Database()