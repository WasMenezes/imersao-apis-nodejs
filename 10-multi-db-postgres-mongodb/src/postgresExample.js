//npm install --save sequelize pg-hstore pg
const Sequelize = require('sequelize') //aqui faltou a desestruturação
const driver = new Sequelize(
  'heroes',
  'wasmenezes',
  'mysecretkey',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    quoteIdentifiers: 0,
    operatorsAliases: 0,
  }
)

async function main() {
  const Heroes = driver.define('heroes', {
    id: {
      type: Sequelize.INTEGER,
      required: 1,
      primaryKey: 1,
      autoIncrement: 1
    },
    name: {
      type: Sequelize.STRING,
      required: 1
    },
    power: {
      type: Sequelize.STRING,
      required: 1
    }
  }, {
    tableName: 'TB_HEROES',
    freezeTableName: 0,
    timestamps: 0
  })
  await Heroes.sync()

  const result = await Heroes.findAll({ raw: 1 })
  console.log(result)
}

main()