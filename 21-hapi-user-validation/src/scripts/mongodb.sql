// docker ps
// docker exec -it 8d428497c2cb mongo -u wasmenezes -p mysecretkey --authenticationDatabase heroes

// dastabases
show dbs 

// changing the context to a database
use heroes

//show tables (collections)
show collections 


db.heroes.insert({
  name: 'Flash',
  power: 'Speed',
  birthDate: '2000-08-01'
})

db.heroes.find().pretty()


for (let i=0; i<= 10000; i++) {
  db.heroes.insert({
    name: `Clone-${i}`,
    power: 'Speed',
    birthDate: '2000-08-01'
  })
}

db.heroes.count()
db.heroes.findOne()
db.heroes.find().limit(1000).sort({name: -1})
db.heroes.find({}, {power: 1, _id:0 })


// create
db.heroes.insert({
  name: 'Flash',
  power: 'Speed',
  birthDate: '2000-08-01'
})

// read
db.heroes.find()

// update 
db.heroes.update({ _id: ObjectId("5ff4e84a22412f89f247138e")},
                  {name: 'Wonderful Woman'})

db.heroes.update({ _id: ObjectId("5ff4eb109bcffde72a115132")},
                {$set:  {name: 'Gren Lantern'}})

db.heroes.update({ power: 'Speed'},
                  { $set: { power: 'Strongman'}})


// delete 
db.heroes.remove({name: 'Wonderful Woman'})