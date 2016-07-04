var ehandlebars = require('express-handlebars')

module.exports = function(app) {
  var hbs = ehandlebars.create({
      defaultLayout: 'app',
      layoutsDir: __dirname + '/views/layouts',
      
    helpers: {
      section: function(name, options) {
        if (!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
      }
    }
  })

  app.engine('handlebars', hbs.engine)
  app.set('view engine', 'handlebars')
}