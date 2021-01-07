const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const failAction = (request, headers, erro) => {
  throw erro;
}

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/heroes',
      method: 'GET',
      config: {
        validate: {
          // payload -> body
          // headers -> header
          // params -> na URL :id
          // query -> ?ski=10limit100
          //failAction: (request, headers,)
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            name: Joi.string().min(3).max(100)
          }
        }
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query

          const query = name ? {
            name: {
              $regex: `.*${name}*.`
            }
          } : {}

          // if (isNaN(skip) && skip)
          //   throw Error('Skip type is incorrect')

          // if (isNaN(limit) && limit)
          //   throw Error('limit type is incorrect')

          return this.db.read(name ? query : {}, skip, limit)

        } catch (error) {
          console.log('Something went wrong', error)
          return "Internal Error"
        }
      }
    }
  }

  create() {
    return {
      path: '/heroes',
      method: 'POST',
      config: {
        validate: {
          failAction,
          payload: {
            name: Joi.string().required().min(3).max(100),
            power: Joi.string().required().min(2).max(100)
          }
        }
      },
      handler: async (request) => {
        try {
          const { name, power } = request.payload
          const result = await this.db.create({ name, power })
          return {
            message: `Hero sucessfuly registered`,
            _id: result._id
          }
        } catch (error) {
          console.log('Something went wrong', error)
          return 'Internal Error'
        }
      }
    }
  }

  update() {
    return {
      path: '/heroes/{id}',
      method: 'PATCH',
      config: {
        validate: {
          params: {
            id: Joi.string().min(3).max(100),
          },
          payload: {
            name: Joi.string().min(3).max(100),
            power: Joi.string().min(2).max(100)
          }
        }
      },
      handler: async (request) => {
        try {
          const {
            id
          } = request.params;

          const { payload } = request
          const dataString = JSON.stringify(payload)
          const data = JSON.parse(dataString)

          const result = await this.db.update(id, data)
          if(result.nModified !== 1) return {
            message: 'Was not possible update'
          }

          return {
            message:'Hero sucessfuly updated'
          }
          
        } catch (error) {
          console.error('Something went wrong', error)
          return 'Internal Error'
        }
      }
    }
  }
}

module.exports = HeroRoutes;