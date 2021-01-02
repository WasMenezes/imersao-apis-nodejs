const { getPeople } = require('./service')

/*
const item = {
  name: 'Erick',
  age: 13,
}

const { name } = item
*/

Array.prototype.myFilter = function (callback) {
  const list = []
  for (index in this) {
    const item = this[index]
    const result = callback(item, index, this)
    if (!result) continue;
    list.push(item)
  }
  return list
}

async function main() {
  try {
    const { results } = await getPeople(`a`)

    // const larsFamily = results.filter(function(item) {
    //   //por padrão precisa retornar um booleano
    //   // para informar se deve manter ou remover
    //   // da lista 
    //   //false > remove
    //   //true  > mantem
    //   //não encontrou = -1
    //   //encontoru = posição no array
    //   const result = item.name.toLowerCase().indexOf('lars') !== -1
    //   return result
    // })

    const larsFamily = results.myFilter((item, index, lista) => {
      console.log(index, lista.length)
      return item.name.toLowerCase().indexOf('lars') !== -1
    })

    const names = larsFamily.map(people => people.name)
    console.log(names)

  } catch (error) {
    console.error('error', error)
  }
}

main()