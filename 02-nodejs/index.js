/**
 * 0 Get a user
 * 1 Get a user phone number by Id
 * 2 Get user adress by Id
 */

 const util = require('util');
 const getAdressAsync = util.promisify(getAdress)

function getUser() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        name: 'Aladin',
        birth: new Date()
      })
    }, 1000)
  })
}

function getPhone(idUser) {
  return new Promise(function resolvePromise(resolve, reject){
    setTimeout(() => {
      return resolve({
        phone: '999999',
        ddd: 99
      })
    }, 2000)
  })
}

function getAdress(idUser, callback) {
  setTimeout(() => {
    return callback(null, {
      street: 'street of grace',
      number: 0
    })
  }, 2000);
}

const userPromise = getUser()

userPromise
  .then(function (user) {
    return getPhone(user.id)
    .then(function resolvePhone(result){
      return {
        user: {
          name: user.name,
          id: user.id//
        },
        phone: result
      }
    })
  })
  .then(function(result) {
    const adress = getAdressAsync(result.user.id)
    return adress.then(function resolveAdress(resultAdress) {
      return {
        user: result.user,
        phone: result.phone,
        adress: resultAdress
      }
    });
  })
  .then(function (result) {
    console.log(`
      Name: ${result.user.name},
      Adress: ${result.adress.street}, ${result.adress.number}, 
      Phone: (${result.phone.ddd}) ${result.phone.phone}, 
    `)
  })
  .catch(function (error) {
    console.error('something went wrong', error)
})

// getUser(function resolveUser(error, user) {
//   if (error) {
//     console.error('something went wrong: user')
//     return
//   }

//   getPhone(user.id, function resolvePhone(error1, phone) {
//     if (error1) {
//       console.error('something went wrong: phone', error1)
//       return
//     }

//     getAdress(user.id, function resolveAdress(error2, adress) {
//       if (error2) {
//         console.error('something went wrong: phone', error2)
//         return
//       }

//       console.log(`
//         Name: ${user.name},
//         Adress: ${adress.street}, ${adress.number}
//         Phone: (${phone.ddd}) ${phone.phone}
//       `)
//     })
//   })
// })
//const phone = getPhone(user.id)

//console.log('phone', phone)
