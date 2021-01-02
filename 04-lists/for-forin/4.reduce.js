const { getPeople } = require('./service')

Array.prototype.myReduce = function(callback, initialValue) {
  let endValue = typeof initialValue !== 'undefined' ? initialValue : this[0]
  for(let index = 0; index < this.length; index++) {
    endValue = callback(endValue, this[index], this)
  }
  return endValue
}

async function main() {
  try {
    const { results } = await getPeople(`a`)
    const heights = results.map(item => parseInt(item.height))
    // const total = heights.reduce((prev, next) => {
    //   return prev + next
    // }, 0)

    const myList = [
      ['Erick', 'Wendel'],
      ['NodeBR', 'Nerdzão'],
    ]

    const total = [myList].myReduce((prev, next) => {
      return prev.concat(next)
    }).join(', ')

    console.log('Heights:', heights)
    console.log('Total:', total)

  } catch (error) {
     console.log('error', error)
  }
}

main()