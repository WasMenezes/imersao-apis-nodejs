const EventEmitter = require('events')
class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter()
const nameEvent = 'userClick'
myEmitter.on(nameEvent, function (click) {
  console.log('um usuário clicou', click)
})

// myEmitter.emit(nameEvent, 'na barra de rolagem')
// myEmitter.emit(nameEvent, 'no ok')


// let count = 0
// setInterval(function () {
//   myEmitter.emit(nameEvent, 'no ok' + (count++))
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', function (value) {
  console.log(`Você digitou: ${value}`)
})