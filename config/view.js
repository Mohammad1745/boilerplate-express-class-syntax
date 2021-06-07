const exphbs = require('express-handlebars')

module.exports = (app, express) => {
    app.use(express.static('public'))

    app.engine('hbs', exphbs({
        // defaultLayout: 'auth',
        extname: '.hbs'
    }))
    app.set('view engine', 'hbs')
    app.set('views','./resources/views')
}