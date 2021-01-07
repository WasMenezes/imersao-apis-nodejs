const BaseRoute = require('./base/baseRoute')
const Joi = require('joi'
)
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
}

module.exports = HeroRoutes;