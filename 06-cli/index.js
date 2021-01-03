const Commander = require('commander')
const Database = require('./database')
const Hero = require('./hero')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nameHero [value]', 'Hero Name')
    .option('-p, --powerHero [value]', 'Hero Power')
    .option('-i, --id [value]', 'Hero ID')


    .option('-c, --create', 'Create a Hero')
    .option('-l, --list', 'List a Hero')
    .option('-r, --remove [value]', 'Remove a Hero')
    .option('-u, --update [value]', 'Update a Hero')



    .parse(process.argv)

  const hero = new Hero({
    name: Commander.nameHero,
    power: Commander.powerHero,
    id: Commander.id
  })

  try {
    if (Commander.create) {
      delete hero.id
      const result = await Database.registerHeroes(hero)
      if (!result) {
        console.error('Hero was not registered')
        return
      }
      console.log('Hero succefully registered')
    }

    if (Commander.list) {
      const result = await Database.getHeroFileData()
      console.log(result)
      return
    }

    if (Commander.remove) {
      const result = await Database.remove(hero.id)
      if (!result) {
        console.error('Unable to remove hero', error)
      }
      console.log('Hero successfully removed')
    }

    if (Commander.update) {
      const idForUpdate = parseInt(Commander.update);
      const data = JSON.stringify(hero)
      const heroUpdate = JSON.parse(data)

      const result = await Database.update(idForUpdate, heroUpdate)
      if(!result) {
        console.error('Unable to update hero')
        return
      }

      console.log('Hero successfully updated')
    }
  }
  catch (error) {
    console.log('Something went wrong', error)
  }
}

main()