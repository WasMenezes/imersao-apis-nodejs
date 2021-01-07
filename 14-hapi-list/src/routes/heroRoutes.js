const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/heroes',
      method: 'GET',
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query

          let query = {}
          if (name) {
            query.name = name
          }

          if (isNaN(skip) && skip)
            throw Error('Skip type is incorrect')

          if (isNaN(limit) && limit)
            throw Error('limit type is incorrect')

          return this.db.read(query, parseInt(skip), parseInt(limit))

        } catch (error) {
          console.log('Something went wrong', error)
          return "Internal Error"
        }
      }
    }
  }
}

module.exports = HeroRoutes;