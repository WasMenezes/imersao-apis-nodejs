const {
  readFile,
  writeFile
} = require('fs')

const {promisify} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
  constructor() {
    this.FILE_NAME = 'heroes.json'
  }

  async getHeroFileData(){
    const file = await readFileAsync(this.FILE_NAME, 'utf8')
    return JSON.parse(file.toString())
  }

  async writeHeroFileData(data){
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data))
    return true
  }

  async registerHeroes(hero) {
    const data = await this.getHeroFileData()
    const id = hero.id <= 2 ? hero.id : Date.now();
    const heroWithId = {
      id,
      ...hero
    }

    const finalData = [
      ...data,
      heroWithId
    ]

    const result = await this.writeHeroFileData(finalData)
    return

  }

  async listHeroes(id){
    const data = await this.getHeroFileData()
    const filteredData = data.filter(item => (id ? (item.id === id) : true))
    return filteredData
  }

  async remove (id) {
    if(!id) {
      return await this.writeFile([])
    }

    const data = await this.getHeroFileData()
    const index = data.findIndex(item => item.id === parseInt(id))
    if(index === -1) {
      throw Error('User not found')
    }

    data.splice(index, 1)
    return await this.writeHeroFileData(data)
  }
}

module.exports = new Database()