const Mongoose = require('mongoose')

Mongoose.connect("mongodb://localhost:27017/heroes", { useNewUrlParser: true, useUnifiedTopology: true });


const connection = Mongoose.connection

// function nameFunction() {

// }

// const myFunction = function () {

// }

// const myFunctionArrow = () => {

// }

connection.once('open', () => console.log('database running!!'))

// setTimeout(() => {
//   const state = connection.readyState
//   console.log('state', state);
// }, 1000)

/*
  0: Diconnected
  1: Connected
  2: Connecting
  3: Disconected
*/

const heroSchema = Mongoose.Schema({
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

const model = Mongoose.model('hero', heroSchema)


async function main() {
  const resultRegister = await model.create({
    name: 'Batman',
    power:'Money'
  })
  console.log('result register', resultRegister)

  const listItens = await model.find()
  console.log('items', listItens)
}

main()